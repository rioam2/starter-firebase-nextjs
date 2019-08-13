/**
 * A CSS Helper for centering Styled-Components using absolute positioning
 * and CSS Transform properties.
 * ```js
 * const something = styled.div`
 *      position: ${centered('horizontal')};
 * `;
 * ```
 * @param mode How the element should be centered
 */
export function centered(mode: 'both' | 'vertical' | 'horizontal' = 'both') {
    const isVert = ['vertical', 'both'].includes(mode);
    const isHoriz = ['horizontal', 'both'].includes(mode);
    const top = isVert ? '50%' : 'auto';
    const left = isHoriz ? '50%' : 'auto';
    const transform = `translate(${isHoriz ? '-50%' : '0'}, ${isVert ? '-50%' : '0'})`;
    return `absolute;
        top: ${top};
        left: ${left};
        transform: ${transform}
        `;
}
