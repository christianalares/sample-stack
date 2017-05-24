import Workshop from '../models/workshop'

// ----------------------------------------
// Get all workshops [GET]
// ----------------------------------------
const getWorkshops = (request, reply) => {
	var name = request.auth.artifacts

	Workshop.find({userId: name._id}, (error, workshops) => {
	if (error) return reply(error).code(500)
	// console.log(request.auth.artifacts)
	return reply(workshops).code(200)
  })
}

// ----------------------------------------
// Get one workshop with {id} [GET]
// ----------------------------------------
const getWorkshop = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, workshops) => {
	if (error) return reply(error).code(500)

	return reply(workshops).code(200)
  })
}

// ----------------------------------------
// Add a workshop [POST]
// ----------------------------------------
const addWorkshop = (request, reply) => {
	const workshop = new Workshop(request.payload)

	workshop.save(error => {
		if (error) return reply({error: error.message}).code(400)

		return reply(workshop).code(200)
	})
}

// ----------------------------------------
// Update a workshop with {id} [PUT]
// ----------------------------------------
const updateWorkshop = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const i = Object.assign(foundWorkshop, request.payload)

		i.save((error, doc) => {
			if (error) return reply({error: error.message}).code(400)

			return reply(doc).code(200)
		})
	})
}

// ----------------------------------------
// Delete a workshop with {id} [DELETE]
// ----------------------------------------
const deleteWorkshop = (request, reply) => {
	Workshop.remove({_id: request.params.id}, (error, workshop) => {
		if (error) return reply(error).code(500)

		return reply(workshop).code(200)
	})
}


exports.register = (server, options, next) => {
	server.route([
		{
			method: 'GET',
			path: '/api/workshops',
			config: {
				handler: getWorkshops,
				auth: 'session'
			}
		},
		{
			method: 'GET',
			path: '/api/workshop/{id}',
			config: {
				handler: getWorkshop,
				auth: 'session'
			}
		},
		{
			method: 'POST',
			path: '/api/workshop',
			config: {
				handler: addWorkshop
			}
		},
		{
			method: 'PUT',
			path: '/api/workshop/{id}',
			config: {
				handler: updateWorkshop
			}
		},
		{
			method: 'DELETE',
			path: '/api/workshop/{id}',
			config: {
				handler: deleteWorkshop
			}
		}
	])
	next()
}

exports.register.attributes = {
	name: 'workshops'
}
