import CONFIG from './config';

const { BASE_URL } = CONFIG;

const API_ENDPOINT = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  GET_USER_LOGGED: `${BASE_URL}/users/me`,
  NOTES: `${BASE_URL}/notes`,
  GET_ARCHIVED: `${BASE_URL}/notes/archived`,
  GET_DETAIL: (id) => `${BASE_URL}/notes/${id}`,
  ARCHIVE_NOTE: (id) => `${BASE_URL}/notes/${id}/archive`,
  UNARCHIVE_NOTE: (id) => `${BASE_URL}/notes/${id}/unarchive`,
};

export default API_ENDPOINT;
