import { nanoid } from "@reduxjs/toolkit";
import React from "react";
// import { httpAddQuestion } from "../../hooks/requests.hooks";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton, Radio, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


function QuestionCreator(props) {
  // const questionId = nanoid()
  const { index } = props;
  const [optionsAmount, setOptionsAmount] = React.useState(4);
  const [questionPrompt, setQuestionPrompt] = React.useState("");
  const [options, setOptions] = React.useState([
    { id: nanoid(), optionText: "", isCorrect: false, },
    { id: nanoid(), optionText: "", isCorrect: false, },
    { id: nanoid(), optionText: "", isCorrect: false, },
    { id: nanoid(), optionText: "", isCorrect: false, },
  ])

  function addOption() {
    if (optionsAmount < 4) {
      setOptionsAmount((prevOptionsAmount) => prevOptionsAmount + 1);
      setOptions(prevOptions => [...prevOptions, { id: nanoid(), optionText: "", isCorrect: false, }])
    }
  }

  function removeOption() {
    if (optionsAmount > 2) {
      setOptionsAmount((prevOptionsAmount) => prevOptionsAmount - 1);
      let newOptions = options
      newOptions.pop()
      setOptions(newOptions)
    }
  }

  function handleOptionTextChange(event, index) {
    const newOptions = [...options];
    newOptions[index].optionText = event.target.value;
    setOptions(newOptions);
  }

  function handleOptionCorrectChange(event, index) {
    const newOptions = [...options];
    newOptions.forEach((option) => (option.isCorrect = false));
    newOptions[index].isCorrect = true;
    setOptions(newOptions);
  }

  
  async function handleSubmit() {
    if(props.shouldSubmit) {
      // await httpAddQuestion(props.userId, props.sessionId, props.quizId, questionPrompt, options)
      // submitData({ id: questionId, questionPrompt, options })
      // console.log({id: questionId, questionPrompt, options })
    }
  }
  handleSubmit();

  const optionElements = Array.from({ length: optionsAmount }, (_, i) => (
    <div key={`div-${i}`}>
      <Box
      
      component="form"
      sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '29ch' }, }}
      noValidate
      autoComplete="on">
      <TextField 
      id="filled-basic" 
      label="enter option text" 
      placeholder="enter option text" 
      variant="filled" 
      key={i}
      name={`optionText-${i}`}
      type="text"
      value={options[i]?.optionText}
      onChange={(event) => handleOptionTextChange(event, i)}
      className="email"
      required/></Box>
      <br></br>
      <Radio
       type="radio"
       className="iscorrect"
        name={`options-${i}`}
        checked={options[i]?.isCorrect}
        onChange={(event) => handleOptionCorrectChange(event, i)}
        sx={{
          color: "white",
          position: "relative",
          left: 140,
          '&.Mui-checked': {
            color: "white",
          },
        }}

       />
      
    </div>
  ));

  return (
    <>
      <h2 style={{ marginLeft: "-900px" }}>{index}</h2>
      <div className="quiz-creator">
        
          <Box
            component="form"
            sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '120ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            label="enter question text" 
            placeholder="enter question text" 
            variant="filled" 
            name="questionPrompt"
            type="text"
            value={questionPrompt}
            className="email"
            onChange={(event) => setQuestionPrompt(event.target.value)}
            required/></Box>
        <br></br>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {optionElements}
        </div>
        <Tooltip onClick={removeOption} title="Delete option">
          <IconButton fontSize="large">
            <DeleteIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip onClick={addOption} title="Add option">
          <IconButton>
            <AddIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>

        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default QuestionCreator;
