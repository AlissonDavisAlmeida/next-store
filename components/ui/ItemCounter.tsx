import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ItemCounterProps {
    quantity: number
    maxVal?: number

    updateQuantity?: (quantity: number) => void
}

function ItemCounter({ quantity, maxVal, updateQuantity }: ItemCounterProps) {
    return (
        <Box display="flex" alignItems={`center`}>
            <IconButton
                onClick={() => updateQuantity && updateQuantity(Math.max(1, quantity - 1))}

            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: "center" }}>{quantity}</Typography>
            <IconButton
                onClick={() => updateQuantity && updateQuantity(maxVal ? Math.min(quantity + 1, maxVal) : quantity + 1)}

            >
                <AddCircleOutline />
            </IconButton>
        </Box>
    );
}

export default ItemCounter;