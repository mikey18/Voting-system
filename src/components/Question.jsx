import { useState } from 'react';
import { databases, DB_ID, COLLECTION_ID } from '../appwrite/appwrite';
import styled from 'styled-components';
import Vote from './Vote';
import PropTypes from 'prop-types';

const Heading = styled.h2`
    font-size: 1.875rem; /* 3xl */
    text-align: center;
    font-weight: bold;
    margin-bottom: 1rem;
    background-color: green;
    width: 100%;
    padding: 50px;
    color: white;
`;

const Form = styled.form`
    width: 80%;
    .form2 {
        display: grid;
        gap: 1rem;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
`;

const SubmitButton = styled.button`
    cursor: pointer;
    margin-left: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    background-color: #22c55e; /* green-400 */
    color: white;
    font-weight: 500;
    font-size: 1.125rem; /* lg */
    padding: 0.5rem 2.5rem;
    transition:
        background-color 0.3s,
        color 0.3s;

    &:hover {
        background-color: white;
        color: #22c55e;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: #94a3b8; /* gray-400 */
        color: #f1f5f9; /* gray-100 */
    }
`;

export default function Question({ data }) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const selectedVote = formData.get('vote');

        if (selectedVote === data.answer_1) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_1: data.votes_1 + 1,
            });
        } else if (selectedVote === data.answer_2) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_2: data.votes_2 + 1,
            });
        } else if (selectedVote === data.answer_3) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_3: data.votes_3 + 1,
            });
        }

        setIsSubmitted(true);
    }

    if (!data) return null;

    const totalVotes = Object.keys(data)
        .filter((key) => key.startsWith('votes_'))
        .reduce((sum, key) => sum + data[key], 0);


    return (
        <>
            <Heading>Nigeria 2027 Election</Heading>
            <Form onSubmit={handleSubmit}>
                {/* <div className="form2">
                    <Vote
                        image={data.image_1}
                        text={data.answer_1}
                        percentage={Math.floor(
                            (data.votes_1 / totalVotes) * 100
                        )}
                        votes={data.votes_1}
                    />
                    <Vote
                        image={data.image_2}
                        text={data.answer_2}
                        percentage={Math.floor(
                            (data.votes_2 / totalVotes) * 100
                        )}
                        votes={data.votes_2}
                    />
                    <Vote
                        image={data.image_3}
                        text={data.answer_3}
                        percentage={Math.floor(
                            (data.votes_3 / totalVotes) * 100
                        )}
                        votes={data.votes_3}
                    />
                </div> */}
                <div className="form2">
                    {Object.keys(data)
                        .filter((key) => key.startsWith('votes_'))
                        .map((key, index) => (
                            <Vote
                                key={index}
                                image={data[`image_${index + 1}`]} // Dynamically get the corresponding image
                                text={data[`answer_${index + 1}`]} // Dynamically get the corresponding answer
                                percentage={Math.floor(
                                    (data[key] / totalVotes) * 100
                                )} // Calculate percentage dynamically
                                votes={data[key]} // Pass the vote count
                            />
                        ))}
                </div>
                <SubmitButton type="submit" disabled={isSubmitted}>
                    Submit your vote
                </SubmitButton>
            </Form>
        </>
    );
}

Question.propTypes = {
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        answer_1: PropTypes.string.isRequired,
        answer_2: PropTypes.string.isRequired,
        answer_3: PropTypes.string.isRequired,
        votes_1: PropTypes.number.isRequired,
        votes_2: PropTypes.number.isRequired,
        votes_3: PropTypes.number.isRequired,
        $id: PropTypes.string.isRequired,
    }).isRequired,
};
