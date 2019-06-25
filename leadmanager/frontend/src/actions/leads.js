import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// GET LEADS
export const getLeads = () => dispatch => {
  axios
    .get("/api/leads/")
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
export const deleteLead = id => dispatch => {
  axios
    .delete(`/api/leads/${id}/`)
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
export const addLead = lead => dispatch => {
  axios
    .post("api/leads/", lead)
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
