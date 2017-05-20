import Part from '../models/part'
import Workshop from '../models/workshop'

// ----------------------------------------
// Get all part [GET]
// ----------------------------------------
const getParts = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, foundWorkshop) => {
	if (error) return reply(error).code(500)

	return reply(foundWorkshop.parts).code(200)
  })
}

// ----------------------------------------
// Get one part with {id} [GET]
// ----------------------------------------
const getPart = (request, reply) => {
	Workshop.findOne({_id: request.params.wid}, (error, foundWorkshop) => {
	if (error) return reply(error).code(500)

	const part = foundWorkshop.parts.filter( (part) => part._id == request.params.pid )[0]

	return reply(part).code(200)
  })
}

// ----------------------------------------
// Add a part [POST]
// ----------------------------------------
const addPart = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const part = new Part(request.payload)

		foundWorkshop.parts.push(part)

		foundWorkshop.save(error => {
			if (error) return reply({error: error.message}).code(400)
			return reply(foundWorkshop).code(200)			
		})

	})
}

// ----------------------------------------
// Update a part with {id} [PUT]
// ----------------------------------------
const updatePart = (request, reply) => {
	Workshop.findOne({_id: request.params.wid}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const partToUpdate = foundWorkshop.parts.filter( (part) => part._id == request.params.pid)[0]
		const index = foundWorkshop.parts.indexOf(partToUpdate)
		
		const newPart = Object.assign(partToUpdate, request.payload)

		foundWorkshop.parts.splice( index, 1, newPart )

		foundWorkshop.save(error => {
			if (error) return reply({error: error.message}).code(400)

			return reply(foundWorkshop).code(200)
		})
	})
}

// ----------------------------------------
// Delete a part with {id} [DELETE]
// ----------------------------------------
const deletePart = (request, reply) => {
	Workshop.findOne({_id: request.params.wid}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const partToDelete = foundWorkshop.parts.filter( (part) => part._id == request.params.pid )[0]
		foundWorkshop.parts.splice( foundWorkshop.parts.indexOf(partToDelete), 1 )

		foundWorkshop.save(error => {
			if (error) return reply({error: error.message}).code(400)

			return reply(foundWorkshop).code(200)
		})
	})
}



exports.register = (server, options, next) => {
	server.route([
		{
			method: 'GET',
			path: '/api/workshop/{id}/parts',
			config: {
				handler: getParts,
				// auth: 'session'
			}
		},
		{
			method: 'GET',
			path: '/api/workshop/{wid}/part/{pid}',
			config: {
				handler: getPart,
				// auth: 'session'
			}
		},
		{
			method: 'POST',
			path: '/api/workshop/{id}/part',
			config: {
				handler: addPart
			}
		},
		{
			method: 'PUT',
			path: '/api/workshop/{wid}/part/{pid}',
			config: {
				handler: updatePart
			}
		},
		{
			method: 'DELETE',
			path: '/api/workshop/{wid}/part/{pid}',
			config: {
				handler: deletePart
			}
		}
	])
	next()
}

exports.register.attributes = {
	name: 'parts'
}

