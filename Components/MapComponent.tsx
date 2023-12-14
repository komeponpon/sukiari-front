import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import CurrentLocationButton from "./CurrentLocationButton";
import ListButton from "./ListButton";
import StatusChips from "./Chips";
import FilterOnButton from "./FilterOnButton";

const MapComponent = ({ all_store_data }: { all_store_data: any[] }) => {
  const [selectedStore, setSelectedStore] = useState<any | null>(null); //店舗選択のステート
  const [currentLocation, setCurrentLocation] = useState<any | null>(null); //現在地表示のステート
  const [currentLocationMarker, setCurrentLocationMarker] = useState<any | null>(null); //現在地表示アイコンのステート
  const [infoPanelOpen, setInfoPanelOpen] = useState<boolean>(false); //情報パネルのステート
  const [selectedMarker, setSelectedMarker] = useState< any | null>(null); //選択したマーカーに対するステート

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

  const markers = all_store_data.map((store) => ({
    lat: store.latitude,
    lng: store.longitude,
    storeData: store, //マーカーがクリックされた際に詳細データにアクセスできるようにデータを保存
  }));
  {/*console.log("[MapComponet]all_store_data]",all_store_data);*/}

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
    //自動休止機能がオフの場合
    if(all_store_data[i]['auto_close'] == 0){
      continue;
    }
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
      }else if(yesterday_open_hour == yesterday_close_hour && yesterday_open_min > yesterday_close_min){
        if(now_hour > yesterday_close_hour){
          all_store_data[i]['rate'] = -99;
          continue;
        }else if(now_hour === yesterday_close_hour && now_min > yesterday_close_min){
          all_store_data[i]['rate'] = -99;
          continue;
        }else{
          continue;
        }
      }else{
        all_store_data[i]['rate'] = -99;
        continue;
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

  // 選択した店舗の今日の情報を取得
  const selectedStoreInfo = () => {
    if (!selectedStore) {
      return null;
    }

    const today = new Date().getDay(); // 今日の日付と曜日


    const isOpenToday = selectedStore[`${todayDay}`]; // 0は営業日、1は定休日、2は24時間営業
    const isOpenYesterday = selectedStore[`${yesterdayDay}`]; // 0は営業日、1は定休日、2は24時間営業


    const todayOpenTime = selectedStore[`${todayDay}_open`];
    const todayCloseTime = selectedStore[`${todayDay}_close`];
    const yesterdayOpenTime = selectedStore[`${yesterdayDay}_open`];
    const yesterdayCloseTime = selectedStore[`${yesterdayDay}_close`];
    const storeStatus = selectedStore[`rate`];

    // 現在の時間を取得
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // 営業時間外かどうかの判定
    let displayText = '';

    if (isOpenToday === 1) {
      displayText = '定休日';
    } else if (isOpenToday === 2) {
      if(storeStatus == -99){
        displayText = '臨時休業';
      }else{
        displayText = '営業中(24時間営業)';
      }
    } else{
      var todayOpenTime_hour = Number(todayOpenTime.split(':')[0]);
      var todayOpenTime_min = Number(todayOpenTime.split(':')[1]);
      var todayCloseTime_hour = Number(todayCloseTime.split(':')[0]);
      var todayCloseTime_min = Number(todayCloseTime.split(':')[1]);
      if(todayOpenTime_hour>todayCloseTime_hour){
        todayCloseTime_hour = todayCloseTime_hour + 24;
      }else if(todayOpenTime_hour==todayCloseTime_hour && todayCloseTime_min >= todayCloseTime_min){
        todayCloseTime_hour = todayCloseTime_hour + 24;
      };
      if(isOpenYesterday === 1){
        if(currentHour < todayOpenTime_hour){
          displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
        }else if(currentHour == todayOpenTime_hour && currentMinute < todayOpenTime_min){
          displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
        }else if(currentHour > todayCloseTime_hour){
          displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
        }else if(currentHour == todayCloseTime_hour && currentMinute > todayCloseTime_min){
          displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
        }else{
          if(storeStatus == -99){
            displayText = '臨時休業';
          }else{
            displayText = `営業中（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }
        }
      }else{
        var yesterdayOpenTime_hour = Number(yesterdayOpenTime.split(':')[0]);
        var yesterdayOpenTime_min = Number(yesterdayOpenTime.split(':')[1]);
        var yesterdayCloseTime_hour = Number(yesterdayCloseTime.split(':')[0]);
        var yesterdayCloseTime_min = Number(yesterdayCloseTime.split(':')[1]);
        if(yesterdayOpenTime_hour > yesterdayCloseTime_hour){
          if(currentHour < yesterdayCloseTime_hour){
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${yesterdayOpenTime_hour}:${yesterdayOpenTime.split(':')[1]} 〜 ${yesterdayCloseTime_hour}:${yesterdayCloseTime.split(':')[1]})`;
            }
          }else if(currentHour == yesterdayCloseTime_hour && currentMinute < yesterdayCloseTime_min){
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${yesterdayOpenTime_hour}:${yesterdayOpenTime.split(':')[1]} 〜 ${yesterdayCloseTime_hour}:${yesterdayCloseTime.split(':')[1]})`;
            }
          }else if(currentHour < todayOpenTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayOpenTime_hour && currentMinute < todayOpenTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour > todayCloseTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayCloseTime_hour && currentMinute > todayCloseTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else{
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
            }
          }
        }else if(yesterdayOpenTime_hour == yesterdayCloseTime_hour && yesterdayOpenTime_min > yesterdayCloseTime_min){
          if(currentHour < yesterdayCloseTime_hour){
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${yesterdayOpenTime_hour}:${yesterdayOpenTime.split(':')[1]} 〜 ${yesterdayCloseTime_hour}:${yesterdayCloseTime.split(':')[1]})`;
            }
          }else if(currentHour == yesterdayCloseTime_hour && currentMinute < yesterdayCloseTime_min){
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${yesterdayOpenTime_hour}:${yesterdayOpenTime.split(':')[1]} 〜 ${yesterdayCloseTime_hour}:${yesterdayCloseTime.split(':')[1]})`;
            }
          }else if(currentHour < todayOpenTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayOpenTime_hour && currentMinute < todayOpenTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour > todayCloseTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayCloseTime_hour && currentMinute > todayCloseTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else{
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
            }
          }
        }else{
          if(currentHour < todayOpenTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayOpenTime_hour && currentMinute < todayOpenTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour > todayCloseTime_hour){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else if(currentHour == todayCloseTime_hour && currentMinute > todayCloseTime_min){
            displayText = `営業時間外（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
          }else{
            if(storeStatus == -99){
              displayText = '臨時休業';
            }else{
              displayText = `営業中（${todayOpenTime_hour}:${todayOpenTime.split(':')[1]} 〜 ${todayCloseTime_hour}:${todayCloseTime.split(':')[1]})`;
            }
          }
        }
      }
    }

    return displayText; // これを表示
  };

  useEffect(() => {
    //ユーザーの現在位置を取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setCurrentLocationMarker("images/cp_red.png"); // 現在地のアイコンを設定
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);


  // マーカーがクリックされたとき、中心をマーカーの位置に設定
  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setInfoPanelOpen(true);
    setSelectedMarker(store);
    {/*setCenter({
      lat: parseFloat(store.latitude),
      lng: parseFloat(store.longitude),
    });*/}
  };

  const handleCloseInfoPanel = () => {
    setSelectedStore(null);
    setInfoPanelOpen(false);
    setSelectedMarker(null); 
  };
  

  const mapHeight = window.innerHeight - 48;

  const containerStyle = {
    width: "100%",
    height: `${mapHeight}px`,
  };

  // デフォルトの値で中心を初期化
  const [center, setCenter] = useState({
    lat: 35.705072213871766,
    lng: 139.66481225644168,
  });

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("現在地の取得エラー:", error);
        }
      );
    }
  };

  const getPinColor = (rate) => {
    if (rate >= 0 && rate <= 30) {
      return "images/image10.png";
    } else if (rate > 30 && rate <= 70) {
      return "images/image11.png";
    } else if (rate > 70 && rate <= 99) {
      return "images/image12.png";
    } else if (rate === 100) {
      return "images/image13.png";
    } else {
      return "images/marker4.png"; 
    }
  };

  const getRatingImage = (rate) => {
    if(rate >= 0 && rate <= 30) {
      return 'images/image0.png';
    } else if (rate > 30 && rate <= 70) {
      return 'images/image1.png';
    } else if (rate >70 && rate <= 99){
      return 'images/image2.png';
    } else if (rate === 100){
      return 'images/image3.png';
    }else{
      return 'images/image4.png';
    }
  };

  const getBorderColor = (rate) => {
    if(rate >= 0 && rate <= 30) {
      return '#7f7fff';
    } else if (rate > 30 && rate <= 70) {
      return '00bb85';
    } else if (rate >70 && rate <= 99){
      return '#ffa500';
    } else if (rate === 100){
      return '#ff4242';
    } else {
      return '#121212';
    }
  };

  console.log("Marker Positions:", markers);



  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoadScript googleMapsApiKey="">
        <GoogleMap 
          mapContainerStyle={containerStyle} 
          center={center} 
          zoom={currentLocation ? 16 : 20}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            styles: [
              {
                featureType: "poi.business",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.park",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.school",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.attraction",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.sports_complex",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.place_of_worship",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "poi.medical",
                stylers: [
                  { visibility: "off" }
                ]
              },
              {
                featureType: "transit.station.bus",
                stylers: [
                  { visibility: "off" }
                ]
              },
            ]
          }}
          >
          
          <StatusChips/>
          <FilterOnButton/>
          <ListButton/>
          
          <CurrentLocationButton onClick={handleCurrentLocationClick} />
          {currentLocation && (
            <Marker 
            position={currentLocation}
            icon={{
              url: currentLocationMarker
            }}
            zIndex={1}
            />
          )}

          {all_store_data.map((storeData, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(storeData.latitude), lng: parseFloat(storeData.longitude) }}
            options={{
              icon: { 
                url: 
                  selectedMarker === storeData
                    ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    : getPinColor(storeData.rate),
              },
              zIndex: 3, 
            }}
            onClick={() => handleMarkerClick(storeData)}
          />
        ))}

        {/*　selectedMarker　*/}
        {selectedMarker && (
          <Marker
            position={{ lat: parseFloat(selectedMarker.latitude), lng: parseFloat(selectedMarker.longitude) }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
            zIndex={2} 
          />
        )}

          {/* Info Panel */}
          {selectedStore && infoPanelOpen && (
            <div
              style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  backgroundColor: "#ffffff",
                  border: `1.8px solid ${getBorderColor(selectedStore.rate)}`,
                  bottom: "14px", 
                  width: "340px",
                  height: "200px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1000,
              }}
            >
            <button
               style={{
               position: "absolute",
               top: "8px",
               right: "8px",
               color:"#121212",
               backgroundColor: "#ffffff",
               border: "none",
               cursor: "pointer",
               fontSize: "20px",
               fontWeight: "bold",
              }}
              onClick={handleCloseInfoPanel}
            >
             &times;
            </button>
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                overflow: "hidden",
              }}>
              <p style={{
                fontSize: "16px",
                fontWeight: "bold", 
                marginTop: "12px", 
                marginLeft: "16px", 
                lineHeight: "1.2", 
                width: "264px",
                whiteSpace: "nowrap", 
                overflow: "hidden",
                textOverflow: "ellipsis",

                }}
                >
                  {selectedStore.name}
                </p>
              </div>

              <div style={{ display: "flex", 
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems:"flex-end"
                             }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "2px",
                      marginLeft: "18px",
                      lineHeight: "0.5",
                    }}
                  >
                    営業時間： {selectedStoreInfo()}
                  </p>
                  {selectedStore.lunch_cost !== null ? (
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "12px",
                        marginLeft: "18px",
                        lineHeight: "0.5",
                      }}
                    >
                      ランチ費用：¥{selectedStore.lunch_cost}〜
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "12px",
                        marginLeft: "18px",
                        lineHeight: "0.5",
                      }}
                    >
                      ランチ費用： ー
                    </p>
                  )}
                  {selectedStore.dinner_cost !== null ? (
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "12px",
                        marginLeft: "18px",
                        lineHeight: "0.5",
                      }}
                    >
                      ディナー費用：¥{selectedStore.dinner_cost}〜
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "12px",
                        marginLeft: "18px",
                        lineHeight: "0.5",
                      }}
                    >
                      ディナー費用： ー
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "12px",
                      marginLeft: "18px",
                      lineHeight: "0.5",
                    }}
                  >
                    店舗紹介：{selectedStore.comment}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src={getRatingImage(selectedStore.rate)}
                  alt="評価アイコン"
                  style={{ width: "75px", height: "75px",marginRight:"8px"}}
                />
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "8px",
              borderRadius: "4px",
              color: "white",
              textDecoration: "none",
              marginTop: "10px",
            }}
            >
              {selectedStore.tabelog_url && (
              <a
                href={selectedStore.tabelog_url}
                target= "_blank"
                rel= "noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                <img
                 src={`images/tabelog.png`}
                 alt="食べログアイコン"
                 style={{width: "48px", height: "48px"}}
                 />
              </a>
              )}
              {selectedStore.instagram_url && (
              <a
                href={selectedStore.instagram_url}
                target= "_blank"
                rel= "noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <img
                 src={`images/Instagram.png`}
                 alt="Instagramアイコン"
                 style={{width: "36px", height: "36px", marginRight: "6px"}}
                 />
              </a>
              )}
            </div>
          </div>
        )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
