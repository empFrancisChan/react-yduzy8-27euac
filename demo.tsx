import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider() {
  const accountBalance = 10000;
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(1000);
  const [value, setValue] = useState(Math.floor(accountBalance / price / 2));
  const [max, setMax] = useState(Math.floor(accountBalance / price));
  let timer1;

  useEffect(() => {
    loop();
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  function loop() {
    setPrice((Math.floor(Math.random() * 10) + 1) * 10 + 1000);
    timer1 = setTimeout(loop, 1000);
  }

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setMax(Math.floor(accountBalance / price));
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box>Price:{price}</Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item>0</Grid>
        <Grid item xs>
          <Slider
            defaultValue={value}
            step={step}
            marks
            min={0}
            max={max}
            value={value}
            onChange={handleChange2}
          />
        </Grid>
        <Grid item>{accountBalance}</Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          Lot: {value}
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
            onClick={() => {
              setValue(value - 1);
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
            onClick={() => {
              setValue(value + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>Required margin: {value * price}</Grid>
      {/* <Box>{max}</Box>
      <Box>{price}</Box> */}
      {/* <Button variant="contained" onClick={loop}>
        Start Random price
      </Button> */}
    </Box>
  );
}
