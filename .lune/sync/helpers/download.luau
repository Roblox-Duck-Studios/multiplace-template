local net = require("@lune/net")
local roblox = require("@lune/roblox")

return function()
	local BUILDING_PLACE = 136557842721933

	local cookie = roblox.getAuthCookie()
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
