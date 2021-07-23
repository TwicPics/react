export const Twicpics = ( { domain, defaultParams } ) => {
    if ( typeof window !== `undefined` ) {

        const parts = [ `${ domain }/?v1` ];
        let twicClass = `twic`;

        if ( defaultParams ) {
            Object.entries( defaultParams ).forEach( ( [ key, value ] ) => {
                if ( value != null ) {
                    // eslint-disable-next-line no-param-reassign
                    key = key.toLowerCase();
                    if ( key === `maxdpr` ) {
                        // eslint-disable-next-line no-param-reassign
                        key = `max-dpr`;
                    } else if ( key === `class` ) {
                        twicClass = value;
                    }
                    parts.push( `${ key }=${ value }` );
                }
            } );
        }

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
