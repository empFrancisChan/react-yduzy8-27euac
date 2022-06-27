import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider() {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(1000);
  const [value, setValue] = useState(Math.floor(accountBalance / price / 2));
  const [max, setMax] = useState(Math.floor(accountBalance / price));
  const [isDragging, setIsDragging] = useState(false);
  const [timer, setTimer] = useState(null);
  var timer1: any = null;

  useEffect(() => {
    loop(false);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      loop(true);
    }
  }, [isDragging]);

  function loop(isChanging: boolean) {
    setPrice((Math.floor(Math.random() * 10) + 1) * 10 + 1000);
    if (!isChanging) {
      //console.log('123');
      setAccountBalance((Math.floor(Math.random() * 10) + 1) * 100 + 10000);
    }
    setTimer(
      setTimeout(() => {
        loop(isChanging);
      }, 1000)
    );
  }
  function changeValue(originalPrice: number) {
    setMax(Math.floor(accountBalance / price));
    if (originalPrice > max || originalPrice < 0) {
      return;
    }
    setValue(originalPrice);
  }

  const handleChangeCommitted = (event, newValue) => {
    setIsDragging(false);
    clearTimeout(timer);
    loop(false);
  };

  const handleChange2 = (event: Event, newValue: number) => {
    setValue(newValue);
    setMax(Math.floor(accountBalance / price));
    if (!isDragging) {
      clearTimeout(timer);
      console.log('clear');
      setIsDragging(true);
    }
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
            onChangeCommitted={handleChangeCommitted}
          />
        </Grid>
        <Grid item>{accountBalance}</Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          Lot:
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
            onClick={() => {
              changeValue(value - 1);
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          {value}
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
            onClick={() => {
              changeValue(value + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>Required margin: {value * price}</Grid>
      {/* <Button variant="contained" onClick={loop}>
        Start Random price
      </Button> */}
      <Grid container spacing={1} alignItems="center">
        <Grid item>0</Grid>
        <Grid item xs>
          <Slider
            defaultValue={value}
            step={step}
            marks
            min={0}
            max={Math.floor(10 / price)}
          />
        </Grid>
        <Grid item>10</Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center">
        <Grid item>0</Grid>
        <Grid item xs>
          <Slider
            defaultValue={value}
            step={step}
            marks
            min={0}
            max={Math.floor(10 / price)}
          />
        </Grid>
        <Grid item>100000</Grid>
      </Grid>
    </Box>
  );
}
