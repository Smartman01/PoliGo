import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

import pollAvgData from './pollAvgData'

class PieChartData extends React.PureComponent {

    render() {

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'black'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={20}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.candidate}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={pollAvgData}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels/>
            </PieChart>
        )
    }

}

export default PieChartData