import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider() {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(1000);
  const [value, setValue] = useState(30);

  const accountBalance = 10000;
  const [max, setMax] = useState(Math.floor(accountBalance / price));
  function loop() {
    //setStep((Math.floor(Math.random() * 10) + 1) * 10 + 1000);
    setPrice((Math.floor(Math.random() * 10) + 1) * 10 + 1000);
    setTimeout(loop, 1000);
  }
  const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setMax(Math.floor(accountBalance / price));
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
      Account Balance:<Box>{accountBalance}</Box>
      Price:<Box>{price}</Box>
      Lot:<Box>{value}</Box>
      <Slider
        defaultValue={value}
        step={step}
        marks
        min={0}
        max={max}
        value={value}
        onChange={handleChange2}
      />
      <Box>{value * price}</Box>
      {/* <Box>{max}</Box>
      <Box>{price}</Box> */}
      <Button variant="contained" onClick={loop}>
        Start Random price
      </Button>
    </Box>
  );
}
