import {fetchUtils} from 'react-admin';
import jsonServerRestClient from 'ra-data-json-server';
const getListParams = {
	filter: {},
	pagination: {
		page: 1,
		perPage: 5000,
	},
	sort: {
		field: 'type',
		order: 'desc'
	}
}

const RestClient = (apiUrl, httpClient = fetchUtils.fetchJson) => {
	let baseClient = jsonServerRestClient(apiUrl, httpClient);
	return {
		getList: (resource, params)=> (baseClient.getList(resource, params)),
		getOne: (resource, params)=> {
			console.log('getOne params', params);
			const promises = [];
			let result = {};
			if(resource=='students'){
				console.log("HERE");
				promises.push(
					baseClient.getOne("students", params)
						.then((response) =>{
							console.log("RESP: ", response.data);
							result = response.data;
							getListParams.filter.student_id = response.data.id;
							promises.push(
								baseClient.getList('Grades', getListParams)
									.then((grade)=>{
										console.log(grade.data);
										result.grade = grade.data;
									})
							)
						})
					)
				return Promise.all(promises).then(()=>({data:result}));
			}
			else{
				return baseClient.getOne(resource, params);
			}
		},
		getMany: (resource, params)=>{
			console.log('getMany params',params);
			const promises = [];
			const results = [];
			for(let i = 0;i<params.ids.length;i++){
				const id = params.ids[i];
				promises.push(
					baseClient.getOne(resource, {id})
						.then((response)=>{
							results.push(response.data);
						})
				)
			}
			return Promise.all(promises).then(()=>({data:results}))
		},
		getManyReference: (resource, params)=>(baseClient.getManyReference(resource, params)),
		update: (resource, params)=>(baseClient.update(resource, params)),
		updateMany: (resource, params)=>(baseClient.updateMany(resource, params)),
		create: (resource, params)=>(baseClient.create(resource, params)),
		delete: (resource, params)=>(baseClient.delete(resource, params)),
		deleteMany: (resource, params)=>(baseClient.deleteMany(resource, params))
	};
};
export default RestClient;
