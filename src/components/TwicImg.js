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

const rAlt = /\/([^/?#.]+)[^/?#]*(?:[?#].*)?$/;
const rStartSlash = /^\//;

const TwicImg = attributes => {

    const scriptInfo = getScriptInfo();

    const { "focus": focusPoint, height, width, src } = attributes;

    // eslint-disable-next-line no-param-reassign
    const ratio =
        // eslint-disable-next-line no-nested-ternary
        attributes.ratio ?
            attributes.ratio.split( `/` ) :
            (
                // eslint-disable-next-line no-nested-ternary
                ( width && height ) ?
                    ( ( height === `auto` ) ? undefined : [ width, height ] ) :
                    [ 1, 1 ]
            );

    const apiRatio = ratio && ratio.join( `:` );

    const { transition, transitionDelay, transitionDuration, transitionTimingFunction } = attributes;

    return (
        <div
            className = {
                `twic-img ${ transition ? `twic-img--fade` : `` }`
            }
            style = {
                ratio && ( () => {
                    const styles = {
                        // eslint-disable-next-line no-magic-numbers
                        "paddingTop": `${ Number.parseFloat( ( ratio[ 1 ] / ratio[ 0 ] ) * 100 ).toFixed( 2 ) }%`,
                    };
                    const apiOutput = ( attributes.placeholder !== `none` ) && attributes.placeholder;
                    if ( apiOutput ) {
                        const transforms = [];
                        if ( focusPoint ) {
                            transforms.push( `focus=${ focusPoint }` );
                        }
                        transforms.push( `cover=${ apiRatio }` );
                        if ( apiOutput ) {
                            transforms.push( `output=${ apiOutput }` );
                        }
                        styles.backgroundImage = `url(${
                            // add a slash if needed.
                            rStartSlash.test( src ) ?
                                `${ scriptInfo.domain }${ src }` :
                                `${ scriptInfo.domain }/${ src }`
                        }?twic=v1/${
                            transforms.join( `/` )
                        })`;
                    }
                    return styles;
                } )()
            }
        >
            <img
                style = {
                    transition ?
                        {
                            "height": ratio ? undefined : `auto`,
                            transitionDelay,
                            transitionDuration,
                            transitionTimingFunction,
                        } :
                        {
                            "height": ratio ? undefined : `auto`,
                        }
                }
                alt = {
                    attributes.alt || ( () => {
                        const tmp = rAlt.exec( src );
                        return ( tmp && tmp[ 1 ] ) || `image`;
                    } )()
                }
                src = {
                    `${
                        scriptInfo.domain
                    }/v1/cover=${
                        apiRatio || `${ width }x1`
                    }/placeholder:transparent`
                }
                width = {
                    ( ratio && width ) || undefined
                }
                height = {
                    ( ratio && height ) || undefined
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
    "placeholder": `preview`,
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
    "placeholder": PropTypes.oneOf( [ `preview`, `meancolor`, `maincolor`, `none` ] ),
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
