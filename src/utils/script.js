const PARAMS = {
    "anticipation": `anticipation`,
    "class": `class`,
    "maxdpr": `max-dpr`,
    "path": `path`,
    "step": `step`,
};

const translateKey = key => {
    const lowerCaseKey = key.toLowerCase();
    return PARAMS.hasOwnProperty( lowerCaseKey ) ? PARAMS[ lowerCaseKey ] : undefined;
};

export const Twicpics = config => {
    if ( typeof document !== `undefined` ) {

        const { domain, defaultParams } = config;

        const parts = [ `${ domain }/?v1` ];
        let twicClass = `twic`;

        Object.entries( defaultParams ? {
            ...defaultParams,
            ...config,
        } : config ).forEach( ( [ key, value ] ) => {
            // eslint-disable-next-line no-param-reassign
            if ( ( key = translateKey( key ) ) ) {
                if ( key === `class` ) {
                    twicClass = value;
                }
                parts.push( `${ key }=${ value }` );
            }
        } );

        const link = document.createElement( `link` );
        link.rel = `preconnect`;
        link.href = domain;

        const script = document.createElement( `script` );
        script.async = true;
        script.defer = true;
        script.src = parts.join( `&` );
        script.setAttribute( `data-id`, `twicpics-script` );

        const style = document.createElement( `style` );
        style.innerText = `.twic-img--fade>img.${ twicClass }-done{opacity:1}`;

        document.head.appendChild( link );
        document.head.appendChild( script );
        document.head.appendChild( style );
    }
};

export const TwicPics = Twicpics;
