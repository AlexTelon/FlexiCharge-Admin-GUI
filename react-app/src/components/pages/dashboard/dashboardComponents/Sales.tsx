import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, Theme } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

const Sales = (props: any) => {
  const theme: Theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: theme.flexiCharge.primary.lightGrey,
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Last year',
        maxBarThickness: 10
      },
      {
        backgroundColor: theme.flexiCharge.accent.primary,
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: 'This year',
        maxBarThickness: 10
      }
    ],
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  };

  const options: any = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  
  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowRight />}
            size="small"
            variant="text"
            color="primary"
            disabled
          >
            List
          </Button>
        )}
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRight />}
          size="small"
          variant="contained"
          style={{ color: theme.flexiCharge.primary.white }}
          disabled
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;