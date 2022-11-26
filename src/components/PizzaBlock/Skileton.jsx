import React from "react"
import ContentLoader from "react-content-loader"

const Skileton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="124" cy="124" r="124" />
        <rect x="0" y="266" rx="10" ry="10" width="249" height="27" />
        <rect x="3" y="307" rx="10" ry="10" width="244" height="53" />
        <rect x="7" y="376" rx="15" ry="15" width="90" height="28" />
        <rect x="137" y="373" rx="14" ry="14" width="109" height="32" />
    </ContentLoader>
)

export default Skileton