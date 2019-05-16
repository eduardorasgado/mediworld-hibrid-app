import React from 'react';
import { Spin, Icon } from 'antd';

export default function Loader(props) {
    const antdIcon = <Icon type='loading-3-quaters' style={{ fontSize: 30}} spin />;
    return (
        <Spin indicator={ antdIcon } style={{ display: 'block', textAlign: 'center', marginTop: 30 }} />
    );
}
