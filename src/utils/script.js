export function Twicpics({ domain, defaultParams }) {
  if (typeof window !== "undefined") {
    const domainUrl = `${domain}/?v1`;
    const el = document.createElement("script");
    const params =
      defaultParams &&
      Object.entries(defaultParams)
        .map(([key, value]) => {
          if (key === "maxDpr") return `&max-dpr=${value}`;
          else return `&${key}=${value}`;
        })
        .join("");

    el.src = defaultParams ? domainUrl + params : domainUrl;
    el.setAttribute("data-id", "twicpics-script");

    const link = document.createElement("link");
    link.setAttribute("rel", "preconnect");
    link.setAttribute("href", domain);

    document.head.appendChild(link);
    document.head.appendChild(el);
  }
}
