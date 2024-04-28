import axios from 'axios';
import '../styles/EventScreen.css'
import { useCookies } from 'react-cookie';
import Leader from '../assets/images/leader.png'
import { useEffect, useState } from 'react';import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ArcElement
  } from 'chart.js';
  import { Chart, Pie } from 'react-chartjs-2';

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ArcElement
  );

export const Summary = ({eventId,eventname,eventPic,dateFrom,dateTo}) => {
    const [cookie] = useCookies()
    const [summaryData,setSummaryData] = useState()
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo&&'')
    const [labels,setLabels] = useState([])
    const [dataset,setDataset] = useState([])
    const [pieChartData,setPieChartData] = useState(null)

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const response = await axios.get(`https://event-management-backend.up.railway.app/api/event/summary?id=${eventId}`,{headers:{session_token:cookie.sessionId}})
                if(response.status === 200){
                    setSummaryData(response.data)
                    setLabels(response.data.sub_events.map(e=>e.name))
                    var bill = response.data.sub_events.map(e=>e.bill.total_accepted_bill_amount)
                    var volunteers = response.data.sub_events.map(e=>e.volunteering_team.total_members)
                    var participant = response.data.sub_events.map(e=>e.participant.total_participants)
                    setDataset([{
                        type: 'line',
                        label: 'Participants',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        fill: false,
                        data: participant,
                      },
                      {
                        type: 'bar',
                        label: 'bills',
                        backgroundColor: 'rgb(75, 192, 192)',
                        data: bill,
                        borderColor: 'white',
                        borderWidth: 2,
                      },{
                        type: 'bar',
                        label: 'volunteers',
                        backgroundColor: 'rgba(255, 206, 86, 1)',
                        data: volunteers,
                        borderColor: 'white',
                        borderWidth: 2,
                      },])

                      setPieChartData({
                        labels: ['Total Verified Bills', 'Total Amount', ],
                        datasets: [
                          {
                            label: 'Amount',
                            data: [response.data.bill.total_accepted_bill_amount,response.data.bill.total_waiting_bill_amount],
                            backgroundColor: [
                              'rgb(255, 99, 132)',
                              'rgb(54, 162, 235)',
                             
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1,
                          }]})
                }
            }catch(err){
                console.log(err);
            }
        }

        getData()
        },[eventId])
    return ( <>
    <div className="top">
        <div className='bulu'>
            <img src={eventPic} alt="" />
            <div className="right">
                <img style={{width:'50px',height:'50px'}} src={Leader} alt="" />
                <h1>{eventname}</h1>
                <p>Coordinated by : {summaryData?.organizing_team.members[0].name}</p>
                <p>Dates: {`${fromDate.getDate()}/${fromDate.getMonth()+1}/${fromDate.getFullYear()}`}{dateTo&&'-'}{dateTo&&`${toDate.getDate()}/${toDate.getMonth()+1}/${toDate.getFullYear()}`}</p>
            </div>
        </div>
        <div className="status">
           {pieChartData&&<Pie style={{width:'250px',height:'250px'}} data={pieChartData} />}
        </div>
    </div>
    <div className="bottom">
        <Chart type='bar' data={{labels,datasets:dataset}} width={window.innerWidth<500&& "500px"} height={window.innerWidth<500&&"1000px"}
  />
    </div>
    </> );
}
