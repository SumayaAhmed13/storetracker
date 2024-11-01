import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Box,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import StatusCode, { currencyFormat } from "../../header/utility/utils";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { useDispatch, useSelector } from "react-redux";

const BasketTable = ({ items, isBasket = true }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.basket);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />

                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <LoadingButton
                    loading={
                      status === StatusCode.LOADING + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error">
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    loading={status === StatusCode.LOADING + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color="secondary">
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              {isBasket && <TableCell align="right">
                
                  <LoadingButton
                    loading={
                      status === StatusCode.LOADING + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error">
                    <Delete />
                  </LoadingButton>
                
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
