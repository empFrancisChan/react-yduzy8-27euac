import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider() {
  const [accountBalance, setAccountBalance] = useState(100000);
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(1000);
  const [value, setValue] = useState(Math.floor(accountBalance / price / 2));
  const [value2, setValue2] = useState(Math.floor(accountBalance / price / 2));
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
      //setPrice((Math.floor(Math.random() * 10) + 1) * 10 + 1000);
      setAccountBalance((Math.floor(Math.random() * 10) + 1) * 1000 + 100000);
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
  function changeValue2(originalPrice: number) {
    setMax(Math.floor(accountBalance / price));
    if (originalPrice > max || originalPrice < 0) {
      return;
    }
    setValue2(originalPrice);
  }

  const handleChangeCommitted = (event, newValue) => {
    setIsDragging(false);
    clearTimeout(timer);
    loop(false);
  };

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue);
    //setMax(Math.floor(accountBalance / price));
    if (!isDragging) {
      clearTimeout(timer);
      setIsDragging(true);
    }
  };
  const handleChange2 = (event: Event, newValue: number) => {
    setValue2(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box>Price:{price}</Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item>0</Grid>
        <Grid item xs>
          <Slider
            //key={`slider-${value}`}
            defaultValue={value}
            step={step}
            marks
            min={0}
            max={Math.floor(accountBalance / price)}
            value={value}
            onChange={handleChange}
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
            defaultValue={0}
            step={step}
            marks
            min={0}
            max={Math.floor(3000 / price)}
          />
        </Grid>
        <Grid item>3000</Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center">
        <Grid item>0</Grid>
        <Grid item xs>
          <Slider
            defaultValue={0}
            step={step}
            marks
            value={value2}
            onChange={handleChange2}
            min={0}
            max={Math.floor(500000 / price)}
          />
        </Grid>
        <Grid item>500000</Grid>
      </Grid>
      <Grid item>
        Lot:
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="small"
          onClick={() => {
            changeValue2(value2 - 1);
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        {value2}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="small"
          onClick={() => {
            changeValue2(value2 + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Box>
  );
}
