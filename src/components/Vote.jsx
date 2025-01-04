import styled from 'styled-components';
import PropTypes from 'prop-types';

const VoteContainer = styled.div`
    display: flex;
    flex-direction: column;

    .image{
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
`;

const RadioInput = styled.input`
    appearance: none;
`;

const Label = styled.label`
    background-color: white;
    border-radius: 0.5rem;
    border: 4px solid transparent;
    cursor: pointer;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        border-color: var(--main-color);
    }
`;

const TextContainer = styled.p`
    font-size: 1.5rem; /* 2xl */
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Progress = styled.progress`
    width: 100%;
    height: 20px;
    margin-top: 1rem;
    border-radius: 10px;

    &::-webkit-progress-bar {
        background: #cbd5e1; /* gray-300 */
        border-radius: 0.5rem;
    }

    &::-webkit-progress-value {
        background: green;
        border-radius: 0.5rem;
        transition: 0.2s;
    }
`;

const Small = styled.small`
    font-size: 20px;
    color: #64748b; /* slate-500 */
`;

export default function Vote({ image, text, percentage, votes }) {
    return (
        <VoteContainer>
            <img src={image} className='image'/>
            <RadioInput type="radio" name="vote" value={text} id={text} />
            <Label htmlFor={text}>
                <TextContainer>
                    {text}
                    <span>{percentage || 0}%</span>
                </TextContainer>
                <Progress value={percentage} max="100">
                    {percentage}%
                </Progress>
                <Small>{votes} votes</Small>
            </Label>
        </VoteContainer>
    );
}

Vote.propTypes = {
    text: PropTypes.string.isRequired,
    percentage: PropTypes.number,
    votes: PropTypes.number.isRequired,
};
