import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Grid, Icon, Image } from 'semantic-ui-react'
import '../'
import '../App.css'
//import Hero from "../components/Hero";
//import Content from "../components/Content";
import { Carousel } from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css"
import Axios from "axios";

var images = [
  'https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg',
  'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289__480.jpg',
  'https://cdn.pixabay.com/photo/2014/10/31/17/41/dancing-dave-minion-510835__480.jpg',
  'https://cdn.pixabay.com/photo/2016/01/22/08/17/banner-1155437__480.png',
  'https://cdn.pixabay.com/photo/2019/01/13/21/36/analog-3931362__480.jpg',
  'https://cdn.pixabay.com/photo/2017/12/18/13/03/grain-3026099__480.jpg',
  'https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg',
  'https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg'
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataHome: []
    }
  }

  getData = () => {
    console.log('tes')
    Axios.get('http://api.tvmaze.com/search/shows?q=a').then((res) => {

      console.log("dataku", res.data)
      this.setState({
        dataHome: res.data
      })

    })
  }


  componentDidMount() {
    console.log('didmount barjalan')
    this.getData()
  }
  render() {

    console.log(this.state.dataHome, "data home");


    return (
      <div>

        <Carousel autoPlay centerMode centerSlidePercentage={40} showStatus={false} >

          {images.map((data, key) => {
            return (
              <div key={key}>

                <img
                  alt=""
                  src={data} />

              </div>
            )

          })}

        </Carousel>

        <Grid>

          <Grid.Column width={4}>
            <div className="d-flex flex-wrap mb-3  justify-content-center">

              {this.state.dataHome.map((data, key) => {

                var images = { ...data.show.image }
                if (images.medium == null) {
                  images.medium = 'https://marketeers.com/wp-content/uploads/2019/10/netflix.jpg'
                }

                return (

                  <Card key={key} className="m-2" width='200'>
                    <Image height='300' width='300' src={images.medium} onError={(e) => { e.target.onerror = null; e.target.src = "https://marketeers.com/wp-content/uploads/2019/10/netflix.jpg" }} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{data.show.name}</Card.Header>
                      <Card.Meta>
                <p >language:{data.show.language}</p>
                      </Card.Meta>
                      <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
      
        <Icon name='user' />
        22 Friends
      
    </Card.Content>
                  </Card>

                )

              })}

            </div>

          </Grid.Column>

        </Grid>



      </div >
    );
  }
}


export default Home;
