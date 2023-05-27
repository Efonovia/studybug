import { Box, TextField } from "@mui/material";
import React from "react";


function CardEditor(props) {
    const { data, onCardDetailsChange } = props;
    const [cardDetails, setCardDetails] = React.useState({
        question: data.question,
        answer: data.answer
    });

    function handleChange(event) {
        const { value, name } = event.target;
        setCardDetails(prevCardDetails => {
            return {
                ...prevCardDetails,
                [name]: value,
            }
        });
        // onCardDetailsChange(cardDetails);
    }

    React.useEffect(() => {
        if (
          cardDetails.question !== data.question ||
          cardDetails.answer !== data.answer
        ) {
          onCardDetailsChange(cardDetails);
        }
      }, [cardDetails, data, onCardDetailsChange]);

    return (
        <div className="flashcard-creator">
           <Box
            component="form"
            sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '120ch' }, }}
            noValidate
            autoComplete="on">
            <TextField
            id="filled-basic" 
            placeholder="enter flashcard term" 
            variant="filled" 
            type="text"
            onChange={handleChange} 
            name="question"
            value={cardDetails.question}
            className="email"
            required/></Box>

        <Box
            component="form"
            sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '120ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            placeholder="enter flashcard definition" 
            variant="filled" 
            type="text"
            onChange={handleChange} 
            name="answer"
            value={cardDetails.answer}
            className="email"
            required/></Box>        </div>
    );
}


export default CardEditor