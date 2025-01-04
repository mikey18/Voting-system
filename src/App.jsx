import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, databases, DB_ID, COLLECTION_ID } from './appwrite/appwrite';
import Question from './components/Question';
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';

const MainContainer = styled.main`
    margin: 0 auto;
    padding: 2.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .loader {
        width: 50px;
        height: 50px;
    }
`;

function App() {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestionsFromDB();
        setLoading(false);

        const unsubscribe = client.subscribe(
            `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
            (res) => {
                console.log(res);

                if (
                    res.events.includes(
                        'databases.*.collections.*.documents.*.update'
                    )
                ) {
                    setQuestions((prevQuestions) => {
                        return prevQuestions.map((question) => {
                            if (question.$id !== res.payload.$id) {
                                return question;
                            }

                            return res.payload;
                        });
                    });

                    console.log('Updated Question');
                }
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    async function getQuestionsFromDB() {
        const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
        setQuestions(questions.documents);
    }

    return (
        <MainContainer>
            {loading ? (
                <Dots size={50} />
            ) : (
                questions.map((question) => (
                    <Question key={question.$id} data={question} />
                ))
            )}
        </MainContainer>
    );
}

export default App;
