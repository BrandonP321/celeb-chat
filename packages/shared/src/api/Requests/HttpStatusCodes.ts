export enum RedirectStatusCodes {}

export enum ClientErrorStatusCodes {
  /** Request could not be understood */
  BadRequest = 400,
  /** Request requires user authentication, can be repeated with appropriate credentials */
  Unauthorized = 401,
  /** Request was understood but is refused, SHOULD NOT BE REPEATED */
  Forbidden = 403,
  /** Nothing found matching Request-URI */
  NotFound = 404,
  /** Method specified in Request-Line not allowed for resource identified by Request-URI */
  MethodNotAllowed = 405,
  /** Identified resource can only generate entities with characteristics not acceptable according to accept headers in request */
  NotAcceptable = 406,
  /** Similary to 401 but client must authenticate itself with the proxy */
  ProxyAuthRequired = 407,
  /** Client did not produce a request within time server was prepared to wait */
  RequestTimeout = 408,
  /** Request could not be completed due to conflict with current state of resource */
  Conflict = 409,
  /** Requested resource is no longer available at the server and no forwarding address is known */
  Gone = 410,
  /** Server refused to accept request without a defined Content-Length */
  LengthRequired = 411,
  /** Precondition given in request header field evaluated to false when tested on server */
  PreConditionFailed = 412,
  /** Request Entity is larger than the server is willing to process */
  RequestEntityTooLarge = 413,
  /** Request URI is longer than server is willing to process */
  RequestURITooLong = 414,
  /** Entity of the request is not in a supported format */
  UnsupportedMediaType = 415,
  /**  */
  RequestedRangeNotSatisfiable = 416,
  /** Expectation given in Expect request header field could not be met by server */
  ExpectationFailed = 417,
}

export enum ServerErrorStatusCodes {
  /** Server encountered an unexpected error */
  InternalServerError = 500,
  /** Server does not support the functionality required to complete the request */
  NotImplemented = 501,
  /** The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request. */
  BadGateway = 502,
  /** Unable to handle request due to temporary overloading or maintenance of server */
  ServiceUnavailable = 503,
  /**  */
  GatewayTimeout = 504,
  /**  */
  HTTPVersionNotSupported = 505,
}

export const HttpStatusCode = {
  ...ServerErrorStatusCodes,
  ...ClientErrorStatusCodes,
  ...RedirectStatusCodes,
};
