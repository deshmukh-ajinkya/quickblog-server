const statusCode = {
  continue: 100,
  ok: 200,
  created: 201,
  new_location: 301,
  diff_location: 302,
  bad_request: 400,
  unauthorized: 401,
  forbidden: 402,
  not_found: 404,
  unprocessed_entity: 422,
  internal_server_error: 500,
  service_unavailable: 503,
  duplicate_entity: 11000
};

export default statusCode;
