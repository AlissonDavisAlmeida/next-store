import { Box, Button } from "@mui/material";
import { ValidSizes } from "../../database/products";

interface SizeSelectorProps {
    selectedSize?: ValidSizes
    sizes: ValidSizes[]
    onSelectSize: (size: ValidSizes) => void
}

export const SizeSelector = ({ selectedSize, sizes, onSelectSize }: SizeSelectorProps) => {
    return (
        <Box>
            {
                sizes.map((size) => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'secondary' : 'primary'}
                        onClick={() => onSelectSize(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    );
}
