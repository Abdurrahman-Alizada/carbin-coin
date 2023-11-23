import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function WalletIndex() {
  return (
    <View>
      {[1].map((item, index) => (
        <View style={{marginTop: '4%'}} key={index}>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item width="100%" marginLeft={20}>
              <SkeletonPlaceholder.Item
                marginTop={7}
                width="90%"
                height={50}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={7}
                width="90%"
                height={50}
                borderRadius={10}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  width: '90%',
                }}>
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="45%"
                  borderRadius={10}
                  height={50}
                />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="45%"
                  height={50}
                  borderRadius={10}
                />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="45%"
                  height={50}
                  borderRadius={10}
                />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="45%"
                  height={50}
                  borderRadius={10}
                />
              </View>
              <SkeletonPlaceholder.Item
                marginTop={14}
                width="90%"
                height={50}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={7}
                width="90%"
                height={50}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={7}
                width="90%"
                height={50}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ))}

      {/* <View style={{marginTop:"7%"}} >
      <SkeletonPlaceholder borderRadius={4} >
        <SkeletonPlaceholder.Item alignItems="center" justifyContent="center" >
            <SkeletonPlaceholder.Item width="30%" height={10} />
            <SkeletonPlaceholder.Item marginTop={7} width="10%" height={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      </View> */}
    </View>
  );
}
