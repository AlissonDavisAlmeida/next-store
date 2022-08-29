import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLAyout } from "../components/layout";

function Custom404() {
    return (

        <ShopLAyout title="Page Not Found" pageDescription="Page 404 description" imageFullUrl="...">
            <Box display="flex" 
                 sx={{flexDirection:{xs:"column", md:"row"}}} 
                 justifyContent={"center"} 
                 alignItems="center" 
                 height={`calc(100vh - 200px)`}>
                <Typography variant="h1" component={"h1"} fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography >Page Not Found</Typography>
            </Box>
        </ShopLAyout>

    );
}

export default Custom404;