import "./twic.module.css";
import PropTypes from "prop-types";
import React from "react";

const getScriptInfo = ( () => {
    const rSplit = /\/\?v1&?/;
    const rClass = /(?:^|&)class=([^&]+)(?:$|&)/;
    let scriptInfo;
    return () => {
        if ( !scriptInfo ) {
            const [ domain, params ] =
                document.querySelector( `script[data-id="twicpics-script"]` ).src.split( rSplit );
            const tmp = rClass.exec( params );
            scriptInfo = {
                domain,
                "class": ( tmp && tmp[ 1 ] ) || `twic`,
            };
        }
        return scriptInfo;
    };
} )();

const MIN_AREA = 12000;

const minArea = ratio => {
    let [ w, h ] = ratio;
    const area = w * h;
    if ( area < MIN_AREA ) {
        const mult = Math.ceil( MIN_AREA / area );
        w *= mult;
        h *= mult;
    }
    return `${ w }x${ h }`;
};

const rAlt = /\/([^/?#.]+)[^/?#]*(?:[?#].*)?$/;
const rStartSlash = /^\//;

const TwicImg = attributes => {

    const scriptInfo = getScriptInfo();

    const { height, mode, src, transition, transitionDelay, transitionDuration, transitionTimingFunction, width } =
        attributes;

    const ratio =
        // eslint-disable-next-line no-nested-ternary
        attributes.ratio ? attributes.ratio.split( `/` ) : ( ( width && height ) ? [ width, height ] : [ 1, 1 ] );

    const apiRatio = ratio.join( `:` );

    const isCover = ( mode === `cover` );

    const position = ( isCover ? `center` : attributes.position );

    const focusPoint = ( isCover && attributes.focus ) || undefined;
    const placeholderTransform = `${ mode }=${ isCover ? apiRatio : minArea( ratio ) }`;

    return (
        <div
            className = {
                `twic-img ${ transition ? `twic-img--fade` : `` }`
            }
            style = {
                ( () => {
                    const styles = {
                        "backgroundPosition": position,
                        "backgroundSize": mode,
                        // eslint-disable-next-line no-magic-numbers
                        "paddingTop": `${ ( ( ratio[ 1 ] * 100 ) / ratio[ 0 ] ).toFixed( 10 ) }%`,
                    };
                    const apiOutput = ( attributes.placeholder !== `none` ) && attributes.placeholder;
                    if ( apiOutput ) {
                        styles.backgroundImage = `url(${
                            // add a slash if needed.
                            rStartSlash.test( src ) ?
                                `${ scriptInfo.domain }${ src }` :
                                `${ scriptInfo.domain }/${ src }`
                        }?twic=v1${
                            focusPoint ? `/focus=${ focusPoint }` : ``
                        }/${
                            placeholderTransform
                        }/output=${
                            apiOutput
                        })`;
                    }
                    return styles;
                } )()
            }
        >
            <img
                style = {
                    {
                        "objectFit": mode,
                        "objectPosition": position,
                        ...(
                            transition ?
                                {
                                    transitionDelay,
                                    transitionDuration,
                                    transitionTimingFunction,
                                } :
                                {}
                        ),
                    }
                }
                alt = {
                    attributes.alt || ( () => {
                        const tmp = rAlt.exec( src );
                        return ( tmp && tmp[ 1 ] ) || `image`;
                    } )()
                }
                src = {
                    `${ scriptInfo.domain }/v1/${ placeholderTransform }/placeholder:transparent`
                }
                width = {
                    width || undefined
                }
                height = {
                    height || undefined
                }
                {
                    ...{
                        [ `data-${ scriptInfo.class }-src` ]: `image:${ src }`,
                        [ `data-${ scriptInfo.class }-src-focus` ]: focusPoint,
                        [ `data-${ scriptInfo.class }-src-step` ]: attributes.step,
                    }
                }
            />
        </div>
    );
};

TwicImg.defaultProps = {
    "alt": undefined,
    "focus": undefined,
    "height": undefined,
    "mode": `cover`,
    "placeholder": `preview`,
    "position": `center`,
    "ratio": undefined,
    "step": undefined,
    "transition": true,
    "transitionDelay": undefined,
    "transitionDuration": undefined,
    "transitionTimingFunction": undefined,
    "width": undefined,
};

TwicImg.propTypes = {
    "alt": PropTypes.string,
    "focus": PropTypes.string,
    "height": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    "mode": PropTypes.oneOf( [ `contain`, `cover` ] ),
    "placeholder": PropTypes.oneOf( [ `preview`, `meancolor`, `maincolor`, `none` ] ),
    "position": PropTypes.string,
    "ratio": PropTypes.string,
    "src": PropTypes.string.isRequired,
    "step": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    "transition": PropTypes.bool,
    "transitionDuration": PropTypes.string,
    "transitionTimingFunction": PropTypes.string,
    "transitionDelay": PropTypes.string,
    "width": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

export default TwicImg;
