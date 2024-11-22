const API_BASE_URL = "http://35.154.97.4:8002";
// const API_BASE_URL = "http://192.168.0.2:8002";

export const refreshToken = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/refresh-token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  return response;
};

export const loginApi = async ({ email: userId, password: password }) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userId, password: password }),
  });
  return response;
};

export const sendPasswordResetOtp = async ({ email: userId }) => {
  const response = await fetch(`${API_BASE_URL}/api/forget-passwrod/sendotp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userId }),
  });
  return response;
};

export const verifyOtp = async ({ email: userId, otp: otp }) => {
  const response = await fetch(
    `${API_BASE_URL}/api/forget-passwrod/verify-otp/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userId, otp: otp }),
    }
  );
  return response;
};

export const resetPassword = async ({
  email: userId,
  newPassword: password,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/forget-passwrod/reset-password/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userId,
        new_password: password,
      }),
    }
  );
  return response;
};

export const changePassword = async (oldPassword, newPassword) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });
  return response;
};

export const fetchStaffDashboardData = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/dashboard-data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const allocateLicense = async ({
  allocated_to: email,
  license: licenseId,
}) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/licenses/${licenseId}/allocate/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ allocated_to: email, license: licenseId }),
    }
  );
  return response;
};

export const revokeLicense = async ({
  allocated_to: email,
  license: licenseId,
}) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/licenses/revoke-license/${licenseId}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ allocated_to: email, license: licenseId }),
    }
  );
  return response;
};

export const fetchLicenses = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/licenses/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const createLicense = async (licenseData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/licenses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      license_id: licenseData.licenseId,
      organization: licenseData.organisation,
      valid_from: `${licenseData.validFrom}T${licenseData.validFromTime}:00Z`,
      valid_till: `${licenseData.validTill}T${licenseData.validTillTime}:00Z`,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create license");
  }

  return response.json();
};

export const fetchLicensesHistory = async (licenseId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/allocations/license/history-report/${licenseId}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  return response;
};

export const fetchCurrentUserData = async () => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await fetch(`${API_BASE_URL}/profile/user_id/${user?.id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const editUserProfile = async (formData) => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await fetch(
    `${API_BASE_URL}/user-profiles/user_id/${user?.id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );
  return response;
};

export const fetchPhishingMails = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/emaildetails/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const fetchEmailDetails = async (msgId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/email-details/?msg_id=${msgId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  return response;
};

export const updatePhishingMailStatus = async (
  newStatus,
  receiverEmail,
  messageId,
  adminComment
) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/emaildetails/update-status/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      status: newStatus,
      recievers_email: receiverEmail,
      message_id: messageId,
      admin_comment: adminComment,
    }),
  });

  return response;
};

export const fetchDisputes = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/dispute-raise-data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const updateDisputeStatus = async (id, status) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/dispute/${id}/update/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return response;
};

export const addDisputeComment = async (id, adminComment) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/dispute/${id}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      dispute: id,
      admin_comment: adminComment,
    }),
  });
  return response;
};

export const disputeStatusChange = async (
  newStatus,
  email,
  messageId,
  adminComment
) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/disputes/update-status/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      status: newStatus,
      email: email,
      message_id: messageId,
      admin_comment: adminComment,
    }),
  });
  return response;
};

export const fetchUsers = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const deleteUsers = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/users/${id}/soft-delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const createUser = async (formData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const deleteLicense = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/license/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const reserveLicense = async (licenseId, action) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/licenses/${licenseId}/reserve/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ action }),
    }
  );
  return response;
};

export const fetchReports = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/allocations/license-report/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const fetchRunTestData = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/sandbox-data/run-test/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const fetchSandboxFetchedData = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/sandbox-data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

//  3 Api for Quarantine
export const fetchQuarantineData = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/quarentine-data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

// Apis for RogueDB

//URL Operations
export const fetchRoughUrl = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-url/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const createRoughUrl = async (urlData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-url/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(urlData),
  });
  return response;
};

export const updateRoughUrl = async (id, urlData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-url/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(urlData),
  });
  return response;
};

export const deleteRoughUrl = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-url/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

//Domain
export const fetchRoughDomain = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-domain/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const createRoughDomain = async (domainData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-domain/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(domainData),
  });
  return response;
};

export const updateRoughDomain = async (id, domainData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-domain/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(domainData),
  });
  return response;
};

export const deleteRoughDomain = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-domain/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

// Mail operations
export const fetchRoughMail = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-mail/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};
export const createRoughMail = async (mailData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-mail/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(mailData),
  });
  return response;
};

export const updateRoughMail = async (id, mailData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-mail/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(mailData),
  });
  return response;
};

export const deleteRoughMail = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/rough-mail/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export const fetchDisabledPlugins = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/disabled-plugins-count/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};
