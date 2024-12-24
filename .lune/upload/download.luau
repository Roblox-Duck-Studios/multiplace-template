local net = require("@lune/net")
local roblox = require("@lune/roblox")
local fs = require("@lune/fs")
local BUILDING_PLACE = require("../configs/place")

return function()
	local cookie = roblox.getAuthCookie() or fs.readFile(".cookie")
	-- print(cookie)
	assert(cookie, "You are not logged into studio!")

	local placeRequest = net.request({
		url = `https://assetdelivery.roblox.com/v1/asset?id={BUILDING_PLACE}`,
		headers = {
			Cookie = cookie,
		},
	})
	assert(
		placeRequest.ok,
		`Unable to download place - status {placeRequest.statusCode} ({placeRequest.statusMessage})`
	)
	return placeRequest.body
end
