import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { tokenConfig } from "./auth";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState))
    .then(response => {
      dispatch({
        type: GET_LEADS,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(response => {
      dispatch(
        createMessage({
          deleteLead: "Lead Deleted"
        })
      );
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(error => console.log(error));
};

// ADD LEAD
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("api/leads/", lead, tokenConfig(getState))
    .then(response => {
      dispatch(
        createMessage({
          addLead: "Lead Added"
        })
      );
      dispatch({
        type: ADD_LEAD,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};
