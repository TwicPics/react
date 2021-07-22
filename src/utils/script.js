export const Twicpics = ( { domain, defaultParams } ) => {
    if ( typeof window !== `undefined` ) {

        const parts = [ `${ domain }/?v1` ];
        let twicClass = `twic`;

        if ( defaultParams ) {
            Object.entries( defaultParams ).forEach( ( [ key, value ] ) => {
                if ( value != null ) {
                    if ( key === `maxDpr` ) {
                        // eslint-disable-next-line no-param-reassign
                        key = `max-dpr`;
                    } else if ( key === `class` ) {
                        twicClass = value;
                    }
                    parts.push( `${ key }=${ value }` );
                }
            } );
        }

        const script = document.createElement( `script` );
        script.src = parts.join( `&` );
        script.setAttribute( `data-id`, `twicpics-script` );

        const link = document.createElement( `link` );
        link.setAttribute( `rel`, `preconnect` );
        link.setAttribute( `href`, domain );

        const style = document.createElement( `style` );
        style.innerText = `.twic-img--fade>img.${ twicClass }-done{opacity:1}`;

        document.head.appendChild( link );
        document.head.appendChild( script );
        document.head.appendChild( style );
    }
};
