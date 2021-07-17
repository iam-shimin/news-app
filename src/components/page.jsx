import React from 'react'
import Grid from "@material-ui/core/Grid";

function Page({children, style = {}, ...gridProps}) {
    return (
        <Grid container style={{ padding: "0 10%", minHeight: "100vh", ...style }} {...gridProps}>
            {children}
        </Grid>
    )
}

export default Page
