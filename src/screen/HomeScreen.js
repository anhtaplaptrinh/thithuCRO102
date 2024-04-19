import {
  FlatList,
  Image,
  SafeAreaView,
  Alert,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTodoApi,
  updateTodoApi,
  fetchTodos,
  addTodoAPI,
} from '../redux/actions/todoAction';
import Banner from '../component/banner';
import TextInputCustoms from '../component/textinput';
import * as ImagePicker from 'react-native-image-picker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ma, setMa] = useState('');
  const [ten, setTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [email, setEmail] = useState('');
  const [hinhanh, sethinhanh] = useState('');
  const [sdt, setSdt] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const initialOffset = 10;

  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const listTodo = useSelector(state => state.todos.listTodo);
  const dispatch = useDispatch();
  const opacity = useSharedValue(0);

  const scale = useSharedValue(1);

  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(withSpring(-offset.value), -1, true);
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.7);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyleButton = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 5000});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const openDetailModal = (item) => {
    setSelectedStudent(item);
    setDetailModalVisible(true);
};
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Banner
        uri={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTMi8WFHpPs0GTeMYYGRsiijx2wAgtMJ50ck7Yn0Ydw&s'
        }
      />
      <View style={{flex: 1, padding: 10, backgroundColor: '#2ecc92'}}>
        <Animated.Text
          style={[
            {
              fontWeight: 'bold',
              fontSize: 30,
              color: 'white',
              alignSelf:"center",
              marginBottom: 10,
            },
            // animatedStyle,
          ]}>
          Danh sách
        </Animated.Text>
        <FlatList
          data={listTodo}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
                
              <View
                style={{
                  width: '100%',
                  padding: 10,
                  height: 120,
                  marginBottom: 10,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                onPress={() => openDetailModal(item)}
                style={{
                    width: '80%',
                    flexDirection: 'row',
                  }}
                >
     
                <View
                  style={{
                    flex: 1,
                    marginRight: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: 'red',
                      borderRadius: 10,
                    }}
                    source={{uri: item.hinhanh_ph43396}}
                  />
                </View>
                <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
                    Mã sinh viên :{item.ma_sinh_vien_ph43396}
                  </Text>
                  <Text>Tên:{item.ten_ph43396}</Text>
                  <Text>Giới tính:{item.gioi_tinh_ph43396}</Text>
                  <Text>Ngày sinh:{item.ngay_sinh_ph43396}</Text>
                  <Text>Email:{item.email_ph43396}</Text>
                  <Text>Số điện thoại:{item.so_dien_thoai_ph43396}</Text>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Thông báo',
                        'Bạn có chắc chắn muốn xóa bản ghi này không ?',
                        [
                          {
                            text: 'Hủy',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Xóa',
                            onPress: () => {
                              dispatch(deleteTodoApi(item.id))
                                .then(result => {
                                  ToastAndroid.show(
                                    'Xóa thành công',
                                    ToastAndroid.SHORT,
                                  );
                                })
                                .catch(error => {
                                  console.error('Error deleting todo:', error);
                                });
                            },
                          },
                        ],
                      );
                    }}>
                    <Text style={{color: 'red', marginRight: 10}}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setUpdate(true);
                      setId(item.id);
                      setMa(item.ma_sinh_vien_ph43396);
                      setTen(item.ten_ph43396);
                      setGioiTinh(item.gioi_tinh_ph43396);
                      setNgaySinh(item.ngay_sinh_ph43396);
                      setEmail(item.email_ph43396);
                      sethinhanh(item.hinhanh_ph43396);
                      setSdt(item.so_dien_thoai_ph43396);
                      setModalVisible(true);
                    }}>
                    <Text style={{color: 'blue'}}>Sửa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}></FlatList>
        <AnimatedTouchableOpacity
          onPress={() => {
            setUpdate(false);
            setId('');
            setMa('');
            setTen('');
            setGioiTinh('');
            setNgaySinh('');
            setEmail('');
            sethinhanh('');
            setSdt('');
            setModalVisible(true);
          }}
          style={[
            {
              position: 'absolute',
              end: 40,
              bottom: 40,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
            },
            animatedStyles,
          ]}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            +
          </Text>
        </AnimatedTouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 350,
                height: 450,
                borderRadius: 20,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                {update ? 'Sửa thông tin' : 'Thêm sinh viên'}
              </Text>

              <TextInputCustoms
                value={ma}
                placeholder="Mã sinh viên"
                onChangeText={text => setMa(text)}
              />
              <TextInputCustoms
                value={ten}
                placeholder="Tên"
                onChangeText={text => setTen(text)}
              />
              <TextInputCustoms
                value={gioiTinh}
                placeholder="Giới tính"
                onChangeText={text => setGioiTinh(text)}
              />
              <TextInputCustoms
                value={ngaySinh}
                placeholder="Ngày sinh"
                onChangeText={text => setNgaySinh(text)}
              />
              <TextInputCustoms
                value={email}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
              />
              <TextInputCustoms
                value={hinhanh}
                placeholder="Hinhanh"
                onChangeText={text => sethinhanh(text)}
              />
              <TextInputCustoms
                value={sdt}
                placeholder="Số điện thoại"
                onChangeText={text => setSdt(text)}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  title="Cancel"
                />
                <Button
                  onPress={() => {
                    if (!update) {
                      const todoData = {
                        ma_sinh_vien_ph43396: ma,
                        ten_ph43396: ten,
                        gioi_tinh_ph43396: gioiTinh,
                        ngay_sinh_ph43396: ngaySinh,
                        email_ph43396: email,
                        hinhanh_ph43396: hinhanh,
                        so_dien_thoai_ph43396: sdt,
                      };
                      dispatch(addTodoAPI(todoData))
                        .then(() => {
                          ToastAndroid.show(
                            'Thêm thành công',
                            ToastAndroid.SHORT,
                          );
                          setModalVisible(false);
                        })
                        .catch(error => {
                          ToastAndroid.show(
                            'Thêm thất bại',
                            ToastAndroid.SHORT,
                          );
                          console.log(error);
                        });
                    } else {
                      const formData = {
                        id: id,
                        data: {
                          ma_sinh_vien_ph43396: ma,
                          ten_ph43396: ten,
                          gioi_tinh_ph43396: gioiTinh,
                          ngay_sinh_ph43396: ngaySinh,
                          email_ph43396: email,
                          hinhanh_ph43396: hinhanh,
                          so_dien_thoai_ph43396: sdt,
                        },
                      };
                      dispatch(updateTodoApi(formData))
                        .then(() => {
                          ToastAndroid.show(
                            'Sửa thành công',
                            ToastAndroid.SHORT,
                          );
                          setModalVisible(false);
                        })
                        .catch(error => {
                          ToastAndroid.show('Sửa thất bại', ToastAndroid.SHORT);
                          console.log(error);
                        });
                    }
                  }}
                  title="SAVE"
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailModalVisible}
          onRequestClose={() => {
            setDetailModalVisible(false);
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 350,
                height: 450,
                borderRadius: 20,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Chi tiết Sách
              </Text>
              {selectedStudent && (
                <View>
                  <Image
                    style={{width: 70, height: 70, borderRadius: 10}}
                    source={{uri: selectedStudent.hinhanh_ph43396}}
                  />
                  <Text>Mã : {selectedStudent.ma_sinh_vien_ph43396}</Text>
                  <Text>Tên: {selectedStudent.ten_ph43396}</Text>
                  <Text>Giới tính: {selectedStudent.gioi_tinh_ph43396}</Text>
                  <Text>
                  Ngày sinh: {selectedStudent.ngay_sinh_ph43396}
                  </Text>
                  <Text>Email: {selectedStudent.email_ph43396}</Text>
                  <Text>Số điện thoại: {selectedStudent.so_dien_thoai_ph43396}</Text>
                </View>
              )}
              <Button
                title="Đóng"
                onPress={() => setDetailModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bannerCss: {
    width: '100%',
    height: 200,
  },
});
