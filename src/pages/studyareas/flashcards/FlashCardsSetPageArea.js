import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, httpAddCardStat } from "../../../hooks/requests.hooks";
import { setUser } from "../../../state/state";
import CardView from "../../../components/flashcards/CardView";
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DashboardNav from "../../../components/app/DashboardNav";
import { Button, Fab } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const sessionTime = new Date().getTime()
function FlashCardsSetPageArea() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        async function fetchData() {
          const updatedUserInfo = await getUser(userInfo._id);
          dispatch(setUser({ user: updatedUserInfo }))
          setLoading(true)
        }
        fetchData();
    }, []);


    console.log("sessionTime: ", sessionTime)
    const navigate = useNavigate()
    const { sessionId, flashcardssetId } = useParams()
    const [activeCard, setActiveCard] = React.useState(0)
    console.log("starting userinfo: ", userInfo)
    let flashCardsSet = userInfo.studySessions.find(session => session.id === sessionId).flashCardsList.find(flashCardsSet => flashCardsSet.id === flashcardssetId)
    
    const [cardsStats, setCardsStats] = React.useState(flashCardsSet.cards.map(card => ({cardId: card.id, stats: card.stats})))
    console.log(cardsStats)
    
    function handleCardsStatsChange(card, newStat) {
        setCardsStats(prevCardsStats => {
            const targetCard = cardsStats.find(thisCard => thisCard.cardId === card.id)
            if(targetCard.stats.find(cardStat => cardStat.statId === newStat.statId)) {
                console.log("found")
                 return [
                    ...(prevCardsStats.filter(thisCard => thisCard.cardId !== card.id)),
                    {
                        cardId: targetCard.cardId,
                        stats: [
                            ...(targetCard.stats.filter(cardStat => cardStat.statId !== newStat.statId)),
                            newStat
                        ],
                    }
                ]
            } else {
                console.log("not found")
                return [
                    ...(prevCardsStats.filter(thisCard => thisCard.cardId !== card.id)),
                    {
                        cardId: targetCard.cardId,
                        stats: [
                            ...(targetCard.stats.filter(cardStat => cardStat.statId !== newStat.statId)),
                            newStat
                        ],
                    }
                ]
            }
        })
    }

    function next() {
        if(activeCard+1 < flashCardsSet.cards.length) {
            setActiveCard(prev => prev += 1)
        }
    }

    function previous() {
        if(activeCard > 0) {
            setActiveCard(prev => prev -= 1)
        }
    }

    async function saveStats() {
        console.log(cardsStats)
        try {
            setLoading(false)
            const promises  = await Promise.all(cardsStats.map(cardStat => httpAddCardStat(userInfo._id, sessionId, flashcardssetId, cardStat.cardId, cardStat.stats)))
            console.log(promises)
            const updatedUserInfo = await getUser(userInfo._id)
            setLoading(true)
            dispatch(setUser({ user: updatedUserInfo }))
            navigate(`/dashboard/session/${sessionId}/flashcards`, {replace: true})
        } catch(err) {
            throw Error(err) //!FIND A WAY TO HANDLE ERRORS THAT STEM FROM RESULTS NOT GOING THROUGH DUE TO INTERNET CONNECTION
        }

        console.log("new user info: ", userInfo)
    }

    return <>
        <DashboardNav />
        {loading ? 
            <>
            
            <div className="flashcard-view-area">
            <Button sx={{ position: "absolute", left: 20, top: 100 }} onClick={saveStats} variant="contained" color="secondary">
                Save Session and return
            </Button>
            <Button sx={{ position: "absolute", right: 50, top: 100 }} onClick={() => navigate(`/dashboard/session/${sessionId}/flashcards`, {replace: true})} variant="contained" color="secondary">
                Quit
            </Button>
            <h1>{flashCardsSet.name}</h1>
            <div className="nav-buttons">
                <Fab onClick={previous}>
                    <ArrowBackIcon />
                </Fab>
                <Fab onClick={next}>
                    <ArrowForwardIcon />
                </Fab>
            </div>
            
            <CardView
            changeStat={handleCardsStatsChange}
            sessionTime={sessionTime}
            statsData={cardsStats.find(cardStat => cardStat.cardId === flashCardsSet.cards[activeCard].id)}
            data={flashCardsSet.cards[activeCard]} />
            </div>
        
            </>
             : <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        }
    </>
}


export default FlashCardsSetPageArea
// A study app that helps you create quizes, flashcards, take notes, view your study stats and progression, collaborate with other learners and allows teachers to collaborate with their students
