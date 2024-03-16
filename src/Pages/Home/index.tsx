import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Layout, Flex, Typography, Input } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ImgData } from './ImgData';
import { useSelector, useDispatch } from 'react-redux';
import { getLabelClicking, displayBoxLabel, checkHandleMouse } from '../../Redux/action';

import Fabric from './Fabric';
import './Home.scss';

const { Sider, Content } = Layout;

function Home() {
    const dispatch = useDispatch();

    let coordinatesLabel = useSelector((state: any) => state.infLabelData);
    const [inputValue, setInputValue] = useState<string>('');
    const [idImage, setIdImage] = useState(0);
    const [listLabel, setListLabel] = useState<any[]>([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [infAllLabel, setInfAllLabel] = useState<any>({});
    const [labelClicking, setLabelClicking] = useState<any>({});
    const [boxLabel, setBoxLabel] = useState(false);
    const [displayInput, setDisplayInput] = useState(true);
    const [handleMouse, setHandleMouse] = useState(true);

    //Lấy giá trị cho hành động checkHandleMouse
    dispatch(checkHandleMouse(handleMouse));
    // Xử lí hai nút chuyển ảnh
    const handleClickArrowLeft = () => {
        idImage > 0 && idImage <= ImgData.length - 1 ? setIdImage(idImage - 1) : console.log('err');
    };
    const handleClickArrowRight = () => {
        idImage >= 0 && idImage < ImgData.length - 1 ? setIdImage(idImage + 1) : console.log('err');
    };

    const handleOnchange = (event: any) => {
        setInputValue(event.target.value);
    };
    // xử lí logic cho nút thêm label
    const handleSubmit = () => {
        const InfLabel = {
            label: inputValue,
            ...coordinatesLabel,
        };
        if (inputValue && InfLabel) {
            setListLabel([...listLabel, InfLabel]);
        }
        setInputValue('');
        setDisplayInput(false);
        setHandleMouse(true);
    };

    // thêm các giá trị vào mảng để log ra ngoài
    useEffect(() => {
        const DataAllLabel = {
            ...ImgData[idImage],
            listLabel,
        };
        setInfAllLabel(DataAllLabel);
    }, [listLabel]);

    useEffect(() => {
        if (infAllLabel) {
            console.log(infAllLabel);
        }
    }, [infAllLabel]);

    // style
    const popoverStyle: CSSProperties = {
        position: 'absolute',
        left: Math.min(labelClicking.startX, labelClicking.endX) + 'px',
        top: Math.max(labelClicking.startY, labelClicking.endY) + 'px',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '10px',
        display: isPopoverVisible ? 'block' : 'none',
    };
    const inputStyle: CSSProperties = {
        position: 'absolute',
        left: coordinatesLabel ? Math.min(coordinatesLabel.startX, coordinatesLabel.endX) + 'px' : '',
        top: coordinatesLabel ? Math.max(coordinatesLabel.startY, coordinatesLabel.endY) + 'px' : '',
        backgroundColor: 'white',
        border: '1px solid black',
        zIndex: 5,

        display: displayInput ? 'block' : 'none',
    };

    const boxLabelStyle: CSSProperties = {
        position: 'absolute',
        left: Math.min(labelClicking.startX, labelClicking.endX) + 'px',
        top: Math.min(labelClicking.startY, labelClicking.endY) + 'px',
        width: Math.abs(labelClicking.endX - labelClicking.startX) + 'px',
        height: Math.abs(labelClicking.endY - labelClicking.startY) + 'px',
        backgroundColor: 'transparent',
        border: '2px solid red',

        opacity: boxLabel ? 1 : 0,
    };
    // xử lí khi click label
    const handleClickLabel = (list: any) => {
        setLabelClicking(list);
        setIsPopoverVisible(true);
        setBoxLabel(true);
        dispatch(getLabelClicking(list));
        dispatch(displayBoxLabel(boxLabel));
    };
    // xử lí một số logic
    useEffect(() => {
        setDisplayInput(true);
        if (coordinatesLabel) {
            setHandleMouse(false);
        }
    }, [coordinatesLabel]);
    useEffect(() => {
        setIsPopoverVisible(false);
        setBoxLabel(false);
    }, [idImage]);

    return (
        <Flex gap="middle" wrap="wrap" className="boxMainHome">
            <Layout className="boxLayout">
                <Sider className="layoutListImg">
                    <div className="boxTitleListImg">
                        <Typography.Text className="TitleListImg">MIND SC</Typography.Text>
                    </div>
                    <div className="boxListImg">
                        {ImgData.map((dataImg, index) => (
                            <div
                                className="ListImgItems"
                                key={index}
                                style={dataImg.id == idImage ? { backgroundColor: 'rgb(24, 141, 243)' } : {}}
                            >
                                <img src={dataImg.url} />
                            </div>
                        ))}
                    </div>
                </Sider>
                <Layout>
                    <Content>
                        <div className="boxNavbar">
                            <div className="NavbarItem" onClick={handleClickArrowLeft}>
                                {' '}
                                <ArrowLeftOutlined />
                            </div>
                            <div className="NavbarItem createButt" onClick={handleSubmit}>
                                <CheckOutlined />
                            </div>
                            <div className="NavbarItem deleteButt">
                                <CloseOutlined />
                            </div>
                            <div className="NavbarItem" onClick={handleClickArrowRight}>
                                <ArrowRightOutlined />
                            </div>
                        </div>
                    </Content>
                    <Content className="layoutContent">
                        <div className="boxContent">
                            <div className="boxImg">
                                <div className="InfImg">
                                    <Typography.Text className="namePicture">{ImgData[idImage].name}</Typography.Text>
                                </div>
                                <div className="Img">
                                    <div style={boxLabelStyle}></div>
                                    <div style={popoverStyle}>{labelClicking.label}</div>
                                    {coordinatesLabel ? (
                                        <div className="inputLable" style={inputStyle}>
                                            <Input value={inputValue} onChange={handleOnchange} />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <Fabric dataImg={ImgData[idImage]} checkMouse={handleMouse} />
                                    <img src={ImgData[idImage].url} />
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Sider className="layoutListLabel">
                    <div className="boxTitleListLable">
                        <Typography.Text className="TitleListLable">Danh sách lable</Typography.Text>
                    </div>

                    <div className="boxListLable">
                        {listLabel.map((list, index) => (
                            <div className="LableItem" key={index} onClick={() => handleClickLabel(list)}>
                                {list.label}
                            </div>
                        ))}
                    </div>
                </Sider>
            </Layout>
        </Flex>
    );
}

export default Home;
