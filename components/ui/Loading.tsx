import { CircularProgress, Typography, Box } from "@mui/material"

export const Loading = () => {
    return (
        <Box 
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems="center"
            height={`calc(100vh - 200px)`}>

                <Typography>Loading...</Typography>
                <CircularProgress  thickness={2}/>
        </Box>
    )
}