import axios from 'axios';
import { setFlash } from './flash'

const GET_LEADERBOARD = 'GET_LEADERBOARD'
const GET_PROFILE = 'GET_PROFILE'

const BASE_URL = 'https://my.callofduty.com/api/papi-client';

export const getLeaderboard = (params) => {
  const { title, platform, time, type, mode, page } = params
  console.log(page)
  const leaderboardEndpoint = BASE_URL + '/leaderboards/v2'
  const uri = 
    `${leaderboardEndpoint}/title/${title}/platform/${platform}/time/${time}/type/${type}/mode/${mode}/page/${page}`
  return (dispatch) => {
    axios.get(uri)
      .then( res => dispatch({
        type: GET_LEADERBOARD,
        leaderboard: res.data.data
      }) )
      .catch( res => {setFlash(res, 'red')})
  }
}

export const getProfile = (params) => {
  const { title, platform, username } = params
  const profileEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${profileEndpoint}/title/${title}/platform/${platform}/gamer/${username}/profile`
  return (dispatch) => {
    axios.get(uri)
      .then( res => dispatch({
        type: GET_PROFILE,
        profile: res.data.data,
      }) )
      .catch( res => {setFlash(res, 'red')})
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return action.leaderboard;
    case GET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

