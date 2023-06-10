type TUrlParam = {
  key: string;
  value: string;
};

/**
 * Url class for maniupulating a url string
 */
class Url {
  private url: URL;

  public get hash() {
    return this.url.hash;
  }
  public get host() {
    return this.url.host;
  }
  public get params() {
    return this.url.searchParams;
  }
  public get path() {
    return this.url.pathname;
  }
  public get port() {
    return this.url.port;
  }
  public get protocol() {
    return this.url.protocol;
  }
  public get origin() {
    return this.url.origin;
  }
  public get paramsString() {
    return this.url.search;
  }
  public get allButDomain() {
    return `${this.path}${this.url.search}`;
  }

  constructor(url: string) {
    this.url = new URL(url);
  }

  /** Returns url as string */
  public toString = () => {
    return this.url.toString();
  };

  public setPath = (newPath: string) => {
    this.url.pathname = newPath;

    return this;
  };

  /** Adds a new search param to the url */
  public addParam = (param: TUrlParam) => {
    this.params.set(param.key, param.value);

    return this;
  };

  /** Adds multiple search params to the url */
  public addParams = (params: { [key: string]: string }) => {
    for (const paramKey in params) {
      this.addParam({ key: paramKey, value: params[paramKey] });
    }

    return this;
  };

  /** Returns the value of a given search param from the url */
  public getParam = (key: string) => {
    return this.params.get(key);
  };
}

/** Utility class for quickly manipulating and interacting with a url string */
export class UrlUtils {
  public static url = (url: string = window.location.href) => {
    return new Url(url);
  };

  /** Returns the value of a specified search param for a given url */
  public static getParam = (
    key: string,
    url: string = window.location.href
  ) => {
    return this.url(url).getParam(key);
  };

  /** Adds a new search param to a given url */
  public static addParams = (
    url: string,
    params: { [key: string]: string }
  ) => {
    return this.url(url).addParams(params).toString();
  };

  public static queryParamKeys = {
    redirectTo: "redirectTo",
  };
}
