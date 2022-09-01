import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ItemCounterProps {

}

function ItemCounter() {
    return (
        <Box display="flex" alignItems={`center`}>
            <IconButton>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: "center" }}>1</Typography>
            <IconButton>
                <AddCircleOutline />
            </IconButton>
        </Box>
    );
}

export default ItemCounter;