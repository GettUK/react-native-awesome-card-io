import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ActivityIndicator,
	TouchableOpacity,
	Image,
	Text,
	View
} from 'react-native';
import { has, isNull, isEqual, isFunction } from 'lodash/fp';
import { ternaryOp } from 'utils';
import assets from 'assets/index';
import styles from './style';

class ListChatItem extends Component {
	state = {
		loading: false
	};
	renderStatus = () =>
		ternaryOp(
			has('isOnline', this.props) && !isNull(this.props.isOnline),
			ternaryOp(
				isEqual(true, this.props.isOnline),
				<View style={styles.status_on} />,
				<View style={styles.status_off} />
			),
			null
		);
	renderInner = () => (
		<View
			style={[
				styles.container,
				has('styleContainer', this.props) ? this.props.styleContainer : {}
			]}>
			<View
				style={[
					styles.left_item,
					has('styleViewSource', this.props) ? this.props.styleViewSource : {}
				]}>
				{has('source', this.props) && !isNull(this.props.source) ? (
					<View>
						<View style={styles.image_view}>
							<Image
								onLoadStart={() => this.setState({ loading: true })}
								onLoadEnd={() => this.setState({ loading: false })}
								style={[
									styles.image,
									has('styleIcon', this.props) ? this.props.styleIcon : {}
								]}
								source={has('source', this.props) ? this.props.source : null}
								resizeMode={
									has('resizeMode', this.props) &&
									!isNull(this.props.resizeMode) ?
										this.props.resizeMode :
										'cover'
								}
							/>
							{this.state.loading || has('loading', this.props) ? (
								<View style={[styles.inner_loader]}>
									<ActivityIndicator animating size="small" color="#F68C41" />
								</View>
							) : null}
						</View>
						{this.renderStatus()}
					</View>
				) : (
					<View>
						<View style={styles.image_view}>
							<Image
								style={styles.image}
								source={assets.aupairLarge}
								resizeMode="center"
							/>
						</View>
						{this.renderStatus()}
					</View>
				)}
			</View>
			<View style={styles.center_item}>
				<View style={styles.row}>
					{has('title', this.props) && !isNull(this.props.title) ? (
						<Text
							numberOfLines={1}
							style={[
								styles.label_title,
								has('styleTitle', this.props) ? this.props.styleTitle : {}
							]}>
							{this.props.title ? this.props.title : null}
						</Text>
					) : null}
					{has('time', this.props) && !isNull(this.props.time) ? (
						<Text
							style={[
								styles.time,
								has('styleTime', this.props) ? this.props.styleTime : {}
							]}>
							{this.props.time ? this.props.time : null}
						</Text>
					) : null}
				</View>
				<View style={styles.row}>
					{has('subtitle', this.props) && !isNull(this.props.subtitle) ? (
						<Text
							numberOfLines={2}
							style={[
								styles.label_subTitle,
								has('styleSubTitle', this.props) ? this.props.styleSubTitle : {}
							]}>
							{this.props.subtitle ? this.props.subtitle : null}
						</Text>
					) : null}
				</View>
			</View>
		</View>
	);
	render() {
		return has('onClick', this.props) &&
			isFunction(this.props.onClick) &&
			!isNull(this.props.onClick) ? (
				<TouchableOpacity
					onPress={has('onClick', this.props) ? this.props.onClick : null}>
					{this.renderInner()}
				</TouchableOpacity>
			) : (
				this.renderInner()
			);
	}
}

ListChatItem.propTypes = {
	onClick: PropTypes.func,
	isOnline: PropTypes.bool,
	// badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
	resizeMode: PropTypes.string,
	styleIcon: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	]),
	styleContainer: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	]),
	styleViewSource: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	]),
	styleTitle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	]),
	styleTime: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	]),
	styleSubTitle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.number
	])
	// styleBadge: PropTypes.oneOfType([
	// 	PropTypes.array,
	// 	PropTypes.object,
	// 	PropTypes.number
	// ])
};

ListChatItem.defaultProps = {
	styleContainer: {},
	styleViewSource: {},
	styleTitle: {},
	styleTime: {},
	styleSubTitle: {}
	// styleBadge: {}
};

export default ListChatItem;
