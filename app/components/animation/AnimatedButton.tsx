import { NavLink } from 'react-router';

interface AnimatedButtonProps {
    text: string;
    href: string;
    variant?: 'filled' | 'outline';
    className?: string;
    /** Text color - default: #fff */
    textColor?: string;
    /** Primary background color - default: #4a1d1c */
    bgPrimary?: string;
    /** Secondary background color (hover) - default: #642826 */
    bgSecondary?: string;
    /** Arrow icon background color - default: same as textColor */
    arrowColor?: string;
}

export function AnimatedButton({
    text,
    href,
    variant = 'filled',
    className = '',
    textColor = '#fff',
    bgPrimary = '#4a1d1c',
    bgSecondary = '#642826',
    arrowColor,
}: AnimatedButtonProps) {
    const isFilled = variant === 'filled';
    const arrowBgColor = bgSecondary;

    // Generate unique ID for scoped styles
    const buttonId = `btn-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <>
            <NavLink
                to={href}
                className={`btn-icon-link ${buttonId} ${className}`}
                prefetch="intent"
                style={{
                    '--btn-text-color': textColor,
                    '--btn-bg-primary': bgPrimary,
                    '--btn-bg-secondary': bgSecondary,
                    '--btn-arrow-color': arrowBgColor,
                } as React.CSSProperties}
            >
                {isFilled ? (
                    <div className="btn-icon-content">
                        <div className="btn-icon-content__mask">
                            <span data-button-anim-target="" className="btn-icon-content__text">
                                {text}
                            </span>
                        </div>
                        <div data-icon-size="normal" className="btn-icon-icon">
                            <div data-button-anim-target="" className="btn-icon-icon__bg"></div>
                            <div className="btn-icon-icon__wrap">
                                <div className="btn-icon-icon__list">
                                    <ArrowIcon />
                                    <ArrowIcon />
                                    <ArrowIcon />
                                </div>
                            </div>
                        </div>
                        <div data-button-anim-target="" className="btn-icon-content__bg"></div>
                    </div>
                ) : (
                    <>
                        <div className="btn-icon-content__mask">
                            <span data-button-anim-target="" className="btn-icon-content__text">
                                {text}
                            </span>
                        </div>
                        <div data-icon-size="normal" className="btn-icon-icon">
                            <div data-button-anim-target="" className="btn-icon-icon__bg"></div>
                            <div className="btn-icon-icon__wrap color--white">
                                <div className="btn-icon-icon__list">
                                    <ArrowIcon />
                                    <ArrowIcon />
                                    <ArrowIcon />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </NavLink>

            <style dangerouslySetInnerHTML={{
                __html: `
                .btn-icon-link {
                    grid-column-gap: .5em;
                    grid-row-gap: .5em;
                    color: var(--btn-text-color, #fff);
                    font-size: 1.1em;
                    line-height: 1.2;
                    text-decoration: none;
                    display: inline-flex;
                    font-family: 'Poppins', sans-serif;
                }

                .btn-icon-icon {
                    z-index: 1;
                    flex: none;
                    justify-content: center;
                    align-items: center;
                    width: 1.5em;
                    height: 1.5em;
                    display: flex;
                    position: relative;
                }

                .btn-icon-icon__bg {
                    background-color: currentColor;
                    border-radius: .125em;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }

                .btn-icon-icon__wrap {
                    color: var(--btn-arrow-color, var(--btn-bg-secondary, #642826));
                    justify-content: flex-end;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .btn-icon-icon__wrap.color--white {
                    color: #fff;
                }

                .btn-icon-icon__list {
                    flex: none;
                    justify-content: flex-start;
                    align-items: center;
                    height: 100%;
                    display: flex;
                }

                .btn-icon-icon__arrow {
                    flex: none;
                    width: 1.3em;
                    height: 100%;
                    padding: .2em;
                }

                a {
                    text-decoration: none !important;
                }

                .btn-icon-content {
                    grid-column-gap: .5em;
                    grid-row-gap: .5em;
                    color: var(--btn-text-color, #fff);
                    background-color: var(--btn-bg-primary, #4a1d1c);
                    border-radius: .25em;
                    justify-content: flex-start;
                    align-items: center;
                    padding: .75em 1em;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .btn-icon-content__text {
                    font-size: 1em;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                }

                .btn-icon-content__mask {
                    z-index: 1;
                    flex: none;
                    justify-content: flex-start;
                    align-items: center;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .btn-icon-content__bg {
                    z-index: 0;
                    background-color: var(--btn-bg-secondary, #642826);
                    width: 120%;
                    height: 100%;
                    position: absolute;
                    bottom: 0%;
                    left: -10%;
                    transform: translate(0, 175%) rotate(15deg);
                }

                [data-button-anim-target] {
                    transition: transform 0.525s cubic-bezier(0.625, 0.05, 0, 1);
                }

                .btn-icon-content__text {
                    --text-duplicate-distance: 1.5em;
                    text-shadow: 0px var(--text-duplicate-distance) currentColor;
                }

                @media (hover:hover) and (pointer:fine) {
                    .btn-icon-link:hover .btn-icon-content__text { 
                        transform: translate(0px, calc(-1 * var(--text-duplicate-distance))); 
                    }
                    
                    .btn-icon-link:hover .btn-icon-icon__bg { 
                        transform: rotate(90deg); 
                    }
                    
                    .btn-icon-link:hover .btn-icon-icon__arrow { 
                        transform: translate(195%, 0px); 
                    }
                    
                    .btn-icon-link:hover .btn-icon-content__bg { 
                        transform: translate(0px, 0%) rotate(0deg); 
                    }
                }
            ` }} />
        </>
    );
}

function ArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 10 8"
            fill="none"
            data-button-anim-target=""
            className="btn-icon-icon__arrow"
        >
            <path
                d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z"
                fill="currentColor"
            />
        </svg>
    );
}
