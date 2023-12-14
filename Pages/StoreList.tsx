import React, {useState} from 'react';
import AppBarComponent from '../Components/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import BasicCard from '../Components/StoreCard';
import Grid from '@mui/material/Grid';
import MapButton from '../Components/MapButton';
import Collapse from '@mui/material/Collapse';



export default function StoreList(props) {
  const all_store_data = props.all_store_data;
  const [isCollapseOpen, setIsCollapseOpen] = useState(Array(all_store_data.length).fill(false));
  const toggleCollapse = (index) => {
    const newCollapseState = [...isCollapseOpen];
    newCollapseState[index] = !newCollapseState[index];
    setIsCollapseOpen(newCollapseState);
  };
  

//営業時間取得
const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var date = new Date;
var day = date.getDay();
var now_hour = date.getHours();
var now_min = date.getMinutes();
var todayDay = weekDays[day];
if(day == 0){
  var yesterdayDay = weekDays[6];
}else{
  var yesterdayDay = weekDays[day - 1];
};

for(let i = 0; i<all_store_data.length; i++){
  //24時間営業かどうか
  if(all_store_data[i][todayDay] == 2){
    continue;
  };
  //本日が定休日かどうか
  if(all_store_data[i][todayDay] == 1){
    //昨日が定休日かどうか
    if(all_store_data[i][yesterdayDay] == 1){
      all_store_data[i]['rate'] = -99;
        continue;
    };
    var yesterday_open_hour = Number(all_store_data[i][yesterdayDay+'_open'].split(':')[0]);
    var yesterday_open_min = Number(all_store_data[i][yesterdayDay+'_open'].split(':')[1]);
    var yesterday_close_hour = Number(all_store_data[i][yesterdayDay+'_close'].split(':')[0]);
    var yesterday_close_min = Number(all_store_data[i][yesterdayDay+'_close'].split(':')[1]);
    //前日の閉店時刻が午前の時間帯かを確認する
    if(yesterday_open_hour > yesterday_close_hour){
      if(now_hour > yesterday_close_hour){
        all_store_data[i]['rate'] = -99;
        continue;
      }else if(now_hour === yesterday_close_hour && now_min > yesterday_close_min){
        all_store_data[i]['rate'] = -99;
        continue;
      }else{
        continue;
      }
    }
  }else{
    var today_open_hour = Number(all_store_data[i][todayDay+'_open'].split(':')[0]);
    var today_open_min = Number(all_store_data[i][todayDay+'_open'].split(':')[1]);
    var today_close_hour = Number(all_store_data[i][todayDay+'_close'].split(':')[0]);
    var today_close_min = Number(all_store_data[i][todayDay+'_close'].split(':')[1]);
    if(today_open_hour > today_close_hour && today_close_hour < 13){
      today_close_hour = today_close_hour + 24;
    }else if(today_open_hour == today_close_hour && today_open_min > today_close_min){
      today_close_hour = today_close_hour + 24;
    };
    if(all_store_data[i][yesterdayDay] == 1){
      if(now_hour < today_open_hour){
        all_store_data[i]['rate'] = -99;
      //現在時刻(分)が開店時刻よりも前か確認する
      }else if(now_hour === today_open_hour && now_min < today_open_min){
        all_store_data[i]['rate'] = -99;
      //現在時刻(時)が閉店時刻よりも後か確認する
      }else if(now_hour > today_close_hour){
        all_store_data[i]['rate'] = -99;
      //現在時刻(分)が閉店時刻よりも後か確認する
      }else if(now_hour === today_close_hour && now_min > today_close_min){
        all_store_data[i]['rate'] = -99;
      };
    }else{
      var yesterday_open_hour = Number(all_store_data[i][yesterdayDay+'_open'].split(':')[0]);
      var yesterday_open_min = Number(all_store_data[i][yesterdayDay+'_open'].split(':')[1]);
      var yesterday_close_hour = Number(all_store_data[i][yesterdayDay+'_close'].split(':')[0]);
      var yesterday_close_min = Number(all_store_data[i][yesterdayDay+'_close'].split(':')[1]);
      //前日の閉店時刻が午前の時間帯かを確認する
      if(yesterday_open_hour < yesterday_close_hour){
        //昨日中に閉店している場合
        //現在時刻(時)が開店時刻よりも前か確認する
        if(now_hour < today_open_hour){
          all_store_data[i]['rate'] = -99;
        //現在時刻(分)が開店時刻よりも前か確認する
        }else if(now_hour === today_open_hour && now_min < today_open_min){
          all_store_data[i]['rate'] = -99;
        //現在時刻(時)が閉店時刻よりも後か確認する
        }else if(now_hour > today_close_hour){
          all_store_data[i]['rate'] = -99;
        //現在時刻(分)が閉店時刻よりも後か確認する
        }else if(now_hour === today_close_hour && now_min > today_close_min){
          all_store_data[i]['rate'] = -99;
        };
      }else if(yesterday_open_hour == yesterday_close_hour && yesterday_open_min < yesterday_close_min){
        //昨日中に閉店している場合
        //現在時刻(時)が開店時刻よりも前か確認する
        if(now_hour < today_open_hour){
          all_store_data[i]['rate'] = -99;
        //現在時刻(分)が開店時刻よりも前か確認する
        }else if(now_hour === today_open_hour && now_min < today_open_min){
          all_store_data[i]['rate'] = -99;
        //現在時刻(時)が閉店時刻よりも後か確認する
        }else if(now_hour > today_close_hour){
          all_store_data[i]['rate'] = -99;
        //現在時刻(分)が閉店時刻よりも後か確認する
        }else if(now_hour === today_close_hour && now_min > today_close_min){
          all_store_data[i]['rate'] = -99;
        };
      //現在時刻が前日の閉店時刻(午前 時)よりも後かを確認する
      }else{
        if(now_hour > yesterday_close_hour){
          //現在時刻(時)が開店時刻よりも前か確認する
          if(now_hour < today_open_hour){
            all_store_data[i]['rate'] = -99;
          //現在時刻(分)が開店時刻よりも前か確認する
          }else if(now_hour === today_open_hour && now_min < today_open_min){
            all_store_data[i]['rate'] = -99;
          //現在時刻(時)が閉店時刻よりも後か確認する
          }else if(now_hour > today_close_hour){
            all_store_data[i]['rate'] = -99;
          //現在時刻(分)が閉店時刻よりも後か確認する
          }else if(now_hour === today_close_hour && now_min > today_close_min){
            all_store_data[i]['rate'] = -99;
          };
        }else if(now_hour === yesterday_close_hour && now_min > yesterday_close_min){
          //現在時刻(時)が開店時刻よりも前か確認する
          if(now_hour < today_open_hour){
            all_store_data[i]['rate'] = -99;
          //現在時刻(分)が開店時刻よりも前か確認する
          }else if(now_hour === today_open_hour && now_min < today_open_min){
            all_store_data[i]['rate'] = -99;
          //現在時刻(時)が閉店時刻よりも後か確認する
          }else if(now_hour > today_close_hour){
            all_store_data[i]['rate'] = -99;
          //現在時刻(分)が閉店時刻よりも後か確認する
          }else if(now_hour === today_close_hour && now_min > today_close_min){
            all_store_data[i]['rate'] = -99;
          };
        };
      };
    }
  };
};




  const getRating = (rate) => {
    if (rate >= 0 && rate <= 30) {
      return 'スキアリ';
    } else if (rate > 30 && rate <= 70) {
      return 'ややスキ';
    } else if (rate > 70 && rate <= 99) {
      return 'ギリスキ';
    } else if (rate === 100) {
      return 'スキナシ';
    } else {
      return '営業時間外';
    }
  };

  const getRatingImage = (rate) => {
    if (rate >= 0 && rate <= 30) {
      return '/images/image0.png';
    } else if (rate > 30 && rate <= 70) {
      return '/images/image1.png';
    } else if (rate > 70 && rate <= 99) {
      return '/images/image2.png';
    } else if (rate === 100) {
      return '/images/image3.png';
    } else {
      return '/images/image4.jpg'
    }
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', marginTop: '48px' }}>
      <CssBaseline />
      <AppBarComponent />
      <Box component="main" sx={{ p: 3, flexGrow: 1, marginTop: '-100px' }}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              overflow: 'auto',
              maxHeight: 'calc(100vh - 64px)',
              order: { xs: 2, sm: 1 },
              mt: { xs: '64px', sm: '24px' },
              zIndex: 2,
            }}
          >
            {all_store_data.map((storeData, index) => (
              <div key={index}>
                <BasicCard
                  heading={storeData.name}
                  subtitle={storeData.address}
                  content={
                    <>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{ marginTop: '16px' }}>
                        <a href={`tel:${storeData.phone_number}`}
                        style={{ color: 'black', textDecoration: 'none' }}>
                        <Typography variant="body2">
                          電話番号：{storeData.phone_number}
                        </Typography>
                        </a>  
                        <Typography variant="body2">
                          ランチ費用：¥{storeData.lunch_cost}〜
                        </Typography>
                        <Typography variant="body2">
                          ディナー費用：¥{storeData.dinner_cost}〜
                        </Typography>
                        <Typography variant="body2">
                          コメント：{storeData.comment}
                        </Typography>
                        <br></br>
                        <Button onClick={() => toggleCollapse(index)}>
                          {isCollapseOpen[index] ? '営業時間を閉じる' : '営業時間を表示する'}
                        </Button>
                        <Collapse in={isCollapseOpen[index]}>
                        <Typography variant="body2">
                        日：{storeData.sunday === 1 ? '定休日' : storeData.sunday === 2 ? '24時間営業' : `${storeData.sunday_open}~${storeData.sunday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        月：{storeData.monday === 1 ? '定休日' : storeData.monday === 2 ? '24時間営業' : `${storeData.monday_open}~${storeData.monday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        火：{storeData.tuesday === 1 ? '定休日' : storeData.tuesday === 2 ? '24時間営業' : `${storeData.tuesday_open}~${storeData.tuesday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        水：{storeData.wednesday === 1 ? '定休日' : storeData.wednesday === 2 ? '24時間営業' : `${storeData.wednesday_open}~${storeData.wednesday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        木：{storeData.thursday === 1 ? '定休日' : storeData.thursday === 2 ? '24時間営業' : `${storeData.thursday_open}~${storeData.thursday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        金：{storeData.friday === 1 ? '定休日' : storeData.friday === 2 ? '24時間営業' : `${storeData.friday_open}~${storeData.friday_close}`}
                        </Typography>
                        <Typography variant="body2">
                        土：{storeData.saturday === 1 ? '定休日' : storeData.saturday === 2 ? '24時間営業' : `${storeData.saturday_open}~${storeData.saturday_close}`}
                        </Typography>
                        </Collapse>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                        }}
                      >
                        <img
                          src={getRatingImage(storeData.rate)}
                          alt={getRating(storeData.rate)}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '8px', marginRight: '15px' }}>
                          {getRating(storeData.rate)}
                        </Typography>
                      </div>
                    </div>
                    <br></br>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: '',
                      }}>
                    {/* Instagramリンク */}
                    {storeData.instagram_url && (
                    <a href={storeData.instagram_url} target="_blank" rel="noopener noreferrer">
                      <Button size='small'>
                        <img
                          src='/images/Instagram.png'
                          alt='Instagram'
                          style={{ width: '50px', height: '50px' }}
                        />
                      </Button>
                    </a>
                    )}
                    {/* 食べログリンク */}
                    {storeData.tabelog_url && (
                    <a href={storeData.tabelog_url} target="_blank" rel="noopener noreferrer">
                      <Button size='small'>
                        <img
                          src='/images/tabelog.png'
                          alt='tabelog'
                          style={{ width: '50px', height: '50px' }}
                        />
                      </Button>
                    </a>
                    )}
                    </div>
                    </>
                  }
                />
                <br />
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>
      <MapButton/>
    </Box>
  );
}