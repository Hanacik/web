import React, { Fragment, useEffect, useState } from "react";
import { Text } from '../containers/Language';


import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import CategoryPage from "./CategoryPage"
import ProductionMenu from '../components/ProductionMenu';
import ProductionPerformanceMenu from '../components/ProductionPerformanceMenu';
import ProductionGrid from '../components/ProductionGrid'
import ProductionGridA from '../components/ProductionGridA'
import ProductionGridB from '../components/ProductionGridB'


import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { getPerformances } from '../data/constans'

export default function ProductionPage({ setHeaderType }) {
  setHeaderType(1)
  const gridSize = 6; // count of performances in a grid 
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [performances, setPerformances] = useState(getPerformances('ALL')); // set all performances as default

  useEffect(() => {
    window.scrollTo(0, 0) // on change go back to top
  }, [selectedPerformance])

  useEffect(() => {
    setPerformances(getPerformances(selectedCategory))
  }, [selectedCategory])

  function ProductionGridLayout() {
    let arrayOfGrids = [];
    let tmpPerformances = [];
    let countOfGrid = 0
    performances.map((performance, index) => {
      if(index != 0) {
        if(index % (gridSize * 2) == 0) {
          arrayOfGrids.push(<ProductionGridB key={countOfGrid} performances={tmpPerformances} setSelectedPerformance={setSelectedPerformance} />);
          tmpPerformances = []
          countOfGrid++;
        } else if(index % gridSize == 0) {
          arrayOfGrids.push(<ProductionGridA key={countOfGrid} performances={tmpPerformances} setSelectedPerformance={setSelectedPerformance} />);
          tmpPerformances = []
          countOfGrid++;
        }
      }
      tmpPerformances.push(performance);
    })

    if(tmpPerformances.length != 0) {
      arrayOfGrids.push(<ProductionGrid key={countOfGrid} performances={tmpPerformances} setSelectedPerformance={setSelectedPerformance} />);
    }
    return (
      <Box className="padd-btm push-btm-hlf padd-top push-top-hlf">{arrayOfGrids}</Box>
    )
  }

  return (
    <Fragment>
      {
        selectedPerformance == null ? (
          <Grid container id="production-page" justify="center" className="content-light content-padd-top padd-btm">
            <Grid item xs={9}>
              <h3 className='page-title padd-top-dbl'><span className='hand' onClick={() => setSelectedCategory('ALL')}><Text tid="production"/></span></h3>
              <Grid container justify="center" className="padd-btm push-btm-hlf">
                <Grid item xs={8}>
                  <ProductionMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                </Grid>
              </Grid>
              <ProductionPerformanceMenu selectedCategory={selectedCategory} setSelectedPerformance={setSelectedPerformance} />
              <ProductionGridLayout/>
              {/*{firstTime && CreateAllGrid(handleSelectedPredstavenie)}
              <div className='scroleArea'>
              <ScrollBar>
              <div>
              {arrayOfGrid}
              </div>
              </ScrollBar>
            </div> */}
            </Grid>
          </Grid>
        ) 
          : 
        (
          <CategoryPage setHeaderType={setHeaderType} selectedPerformance={selectedPerformance} setSelectedPerformance={setSelectedPerformance} />
        )
      }
    </Fragment>
  );
}
