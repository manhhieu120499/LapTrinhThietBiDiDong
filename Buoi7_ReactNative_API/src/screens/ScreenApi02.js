import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StatusBar,
	TextInput,
	FlatList,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

function ScreenApi02(props) {
	const { navigation, route } = props;
	const { navigate, goBack } = navigation;
	const [isEdited, setIsEdited] = useState(false);
	const [jobName, setJobName] = useState({
		id: '',
		job_title: '',
	});
	const navigations = useNavigation();
	const BASE_URI =
		'https://665024f3ec9b4a4a6030e184.mockapi.io/api/v1/course/jobs';
	const [isChecked, setChecked] = useState(false);
	const [jobs, setJobs] = useState([]);

	const handleRenderJobs = () => {
		fetch(BASE_URI)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setJobs(data);
			});
	};

	const handleUpdateJob = (id) => {
		fetch(BASE_URI + '/' + id, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(jobName),
		}).then((res) => {
			if (res.status == 200) {
				alert('Update job successful');
			} else {
				alert('Update job fail');
			}
		});
		handleRenderJobs();
	};

	useEffect(() => {
		const unsubscribe = navigations.addListener('focus', () => {
			handleRenderJobs();
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		handleRenderJobs();
	}, []);

	return (
		<View
			style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
		>
			<StatusBar style="auto" />
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => navigate('ScreenApi')}>
					<Image source={require('../../assets/btnGoBack.png')} />
				</TouchableOpacity>
				<View style={{ flexDirection: 'row' }}>
					<Image
						source={require('../../assets/user.png')}
						style={{ width: 50, height: 50, borderRadius: 25 }}
					/>
					<View style={{ marginLeft: 10 }}>
						<Text
							style={{
								color: 'rgba(23, 26, 31, 1)',
								fontSize: 20,
								fontWeight: 'bold',
								textAlign: 'center',
							}}
						>
							{route.params.name || 'Hi Twinkle'}
						</Text>
						<Text
							style={{
								color: 'rgba(23, 26, 31, 1)',
								fontSize: 14,
							}}
						>
							Have agrate day a head
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flex: 1.5,
					alignItems: 'center',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						width: '95%',
						height: 44,
						paddingHorizontal: 10,
						alignItems: 'center',
						borderWidth: 1,
						borderColor: 'rgba(144, 149, 160, 1)',
						borderRadius: 10,
						marginTop: 15,
					}}
				>
					<Image source={require('../../assets/search.png')} />
					<TextInput
						placeholder="Search"
						placeholderTextColor={'rgba(23, 26, 31, 1)'}
						style={{
							color: 'rgba(23, 26, 31, 1)',
							width: '90%',
							height: '100%',
							paddingHorizontal: 8,
						}}
					/>
				</View>
			</View>
			<View
				style={{
					flex: 5,
					alignItems: 'center',
				}}
			>
				<FlatList
					data={jobs}
					renderItem={({ item }) => (
						<View
							style={{
								width: '95%',
								height: 48,
								borderRadius: 24,
								backgroundColor: 'rgba(222, 225, 230, 0.47)',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								shadowColor: 'rgba(23, 26, 31, 0.15)',
								shadowOffset: { width: 0, height: 8 },
								elevation: 17,
								marginVertical: 10,
								alignSelf: 'center',
							}}
						>
							<Checkbox
								style={{ width: 15, height: 15 }}
								value={isChecked}
								onValueChange={setChecked}
							/>
							<TextInput
								style={{
									width: '70%',
									paddingLeft: 15,
									color: 'black',
								}}
								value={jobName.job_title || item.job_title}
								editable={isEdited}
								onChangeText={(text) =>
									setJobName({ id: item.id, job_title: text })
								}
							/>

							<TouchableOpacity
								onPress={() => setIsEdited(!isEdited)}
							>
								{!isEdited && (
									<Image
										source={require('../../assets/edit.png')}
									/>
								)}
								{isEdited && (
									<TouchableOpacity
										style={{
											width: 40,
											height: 20,
											borderWidth: 1,
											borderColor: '#ccc',
											alignItems: 'center',
										}}
										onPress={() => {
											handleUpdateJob(item.id);
											setIsEdited(!isEdited);
											setJobName({
												id: '',
												job_title: '',
											});
										}}
									>
										<Text>Save</Text>
									</TouchableOpacity>
								)}
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					style={{ width: '100%' }}
				/>
			</View>
			<View style={{ flex: 2, alignItems: 'center', marginTop: 20 }}>
				<TouchableOpacity
					style={{ width: 69, height: 69, borderRadius: 33 }}
					onPress={() =>
						navigate('ScreenApi03', {
							name: route.params.name,
						})
					}
				>
					<Image
						source={require('../../assets/btn_add.png')}
						style={{ width: '100%', height: '100%' }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default ScreenApi02;
