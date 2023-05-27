import React from "react"
import StatsBarChart from "./StatsBarChart";
import StatsLineChart from "./StatsLineChart";
import { Box, Tab, Tabs } from "@mui/material";
import "../../../styles/statspage.css"


function QuizStatsPage(props) {
    const stats = [
        {
        "id": "eaE-u4Rm-2pnWbcd9kcHE",
        "dateTaken": 1681496583538,
        "score": 4,
        "questionAmount": 8
        },
        {
        "id": "C3hCNeoFrq6lLXqvIawHl",
        "dateTaken": 834591038285,
        "score": 50.51967082448721,
        "questionAmount": 43
        },
        {
        "id": "nJ6-0MA2U6kfGL-7svgYT",
        "dateTaken": 490701765981,
        "score": 0.04620685918672596,
        "questionAmount": 17
        },
        {
        "id": "dYF-jfm9_cTpiFWMnDiXI",
        "dateTaken": 1119732346020,
        "score": 46.43596541414689,
        "questionAmount": 38
        },
        {
        "id": "khC5pW9BpZH7xjkMaiwHk",
        "dateTaken": 200816667179,
        "score": 19.729783659822985,
        "questionAmount": 6
        },
        {
        "id": "B9jd-sUnx-Ecy5pnN_dQI",
        "dateTaken": 1263468198706,
        "score": 93.91445559491916,
        "questionAmount": 37
        },
        {
        "id": "xkmz758MBHZEMMqFBRr-b",
        "dateTaken": 1323002611564,
        "score": 6.411313372555738,
        "questionAmount": 9
        },
        {
        "id": "VU73q1QYAgmKGdsFT54XM",
        "dateTaken": 525149152947,
        "score": 69.74712693684755,
        "questionAmount": 47
        },
        {
        "id": "Xm_BqJ58d1gn0FGXkqNAj",
        "dateTaken": 590216058527,
        "score": 89.10004069930973,
        "questionAmount": 31
        },
        {
        "id": "8eRaVJXuImCYCJGEHyXnD",
        "dateTaken": 473199286989,
        "score": 33.461956351518275,
        "questionAmount": 14
        },
        {
        "id": "IgFnK49mW04WwN1MR5wgl",
        "dateTaken": 1200467895014,
        "score": 90.16414215396793,
        "questionAmount": 7
        },
        {
        "id": "EhFAWdDGsF_scr5gn7igJ",
        "dateTaken": 1158854499081,
        "score": 65.59313516762823,
        "questionAmount": 47
        },
        {
        "id": "DNTHOhhHdnssCTSORYr0r",
        "dateTaken": 892419134170,
        "score": 36.289074046887706,
        "questionAmount": 47
        },
        {
        "id": "a6n8lzFGJ_PVlnxe6veGO",
        "dateTaken": 300618433612,
        "score": 83.41966186282748,
        "questionAmount": 30
        }
    ]

    const [value, setValue] = React.useState(0)
     
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    return <>
        <div className="stats-area">
          <h1>Quiz Stats</h1>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Bar chart"/>
              <Tab label="Line chart"/>
            </Tabs>
          </Box>
          
        </div>
        {
          value ? 

          <StatsLineChart stats={stats} />
          :
          <StatsBarChart stats={stats} />
        }
      
      </>
}


export default QuizStatsPage