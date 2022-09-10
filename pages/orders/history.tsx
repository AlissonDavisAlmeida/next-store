import NextLink from "next/link"
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLAyout } from "../../components/layout";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Full Name", width: 300 },
    { field: "order", headerName: "Order", width: 200 },
    {
        field: "pay",
        headerName: "Pay",
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.pay
                    ? <Chip color="success" label="paid" variant="outlined" />
                    : <Chip color="error" label="not paid" variant="outlined" />

            )
        }
    },
    {
        field: "see-order",
        headerName: "See Order",
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline={`always`}>
                        See Order
                    </Link>
                </NextLink>
            )
        }
    },

]

const row = [
    { id: 1, pay: true, fullName: "Alisson", order: "adofa2" },
    { id: 2, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 3, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 4, pay: true, fullName: "Alisson", order: "adofa2" },
    { id: 5, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 6, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 7, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 8, pay: false, fullName: "Alisson", order: "adofa2" },
    { id: 9, pay: false, fullName: "Alisson", order: "adofa2" },
]

function HistoryPage() {
    return (
        <ShopLAyout
            title="History of your orders"
            pageDescription="Review your orders"
        >
            <Typography variant="h1" component="h1">
                History of your orders
            </Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}

                    />
                </Grid>
            </Grid>
        </ShopLAyout>
    );
}

export default HistoryPage;